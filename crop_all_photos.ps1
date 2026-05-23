# Script to crop 1:1 and resize original event photos to HD (800x800)
# Preserves original backgrounds, enhancing aspect-ratio and resolution.
# Pure ASCII characters to prevent PowerShell encoding/parsing errors.
# Uses double-wildcards to match the two-level directory structure under Imagenes.

Add-Type -AssemblyName System.Drawing

$baseDir = "."
$destBase = "public\images\eventos"

# Ensure destination directory exists
if (!(Test-Path $destBase)) {
    New-Item -ItemType Directory -Force -Path $destBase
}

function Crop-And-Resize-Image {
    param (
        [string]$SourcePath,
        [string]$DestinationPath,
        [int]$TargetWidth = 800,
        [int]$TargetHeight = 800
    )

    if (!(Test-Path $SourcePath)) {
        Write-Warning "Source file does not exist: $SourcePath"
        return
    }

    Write-Host "Processing: $SourcePath"
    Write-Host "Destination: $DestinationPath"
    
    try {
        # Load original image
        $srcImage = [System.Drawing.Image]::FromFile($SourcePath)
        
        # Calculate square size for 1:1 center crop
        $srcWidth = $srcImage.Width
        $srcHeight = $srcImage.Height
        $squareSize = [System.Math]::Min($srcWidth, $srcHeight)
        
        # Crop coordinates
        $cropX = [System.Math]::Floor(($srcWidth - $squareSize) / 2)
        $cropY = [System.Math]::Floor(($srcHeight - $squareSize) / 2)
        
        # Create destination bitmap
        $destBitmap = New-Object System.Drawing.Bitmap($TargetWidth, $TargetHeight)
        $graphics = [System.Drawing.Graphics]::FromImage($destBitmap)
        
        # High quality scaling
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
        
        # Transparent background
        $graphics.Clear([System.Drawing.Color]::Transparent)
        
        $srcRect = New-Object System.Drawing.Rectangle($cropX, $cropY, $squareSize, $squareSize)
        $destRect = New-Object System.Drawing.Rectangle(0, 0, $TargetWidth, $TargetHeight)
        
        # Draw cropped image
        $graphics.DrawImage($srcImage, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
        
        # Save as PNG
        $destBitmap.Save($DestinationPath, [System.Drawing.Imaging.ImageFormat]::Png)
        
        # Clean up
        $graphics.Dispose()
        $destBitmap.Dispose()
        $srcImage.Dispose()
        
        Write-Host "Success: Cropped and saved to HD." -ForegroundColor Green
    } catch {
        Write-Error "Error processing image $SourcePath : $_"
    }
}

# Resolve paths dynamically using two-level wildcards to avoid encoding errors with accents/eñes
Write-Host "Resolving paths..."
$resolvedCumpleDir = (Get-ChildItem -Path "Imagenes\*\*\Tem*os\Cumple*os" -Directory | Select-Object -First 1).FullName
$resolvedTematicasDir = (Get-ChildItem -Path "Imagenes\*\*\Tem*os" -Directory | Select-Object -First 1).FullName
$resolvedNavidadSrc = (Get-ChildItem -Path "Imagenes\*\*\Dulcesnavid*.png" -File | Select-Object -First 1).FullName

Write-Host "Cumpleanos Dir: $resolvedCumpleDir"
Write-Host "Tematicas Dir: $resolvedTematicasDir"
Write-Host "Navidad Src: $resolvedNavidadSrc"

# Ensure crucial directories were resolved successfully
if ([string]::IsNullOrEmpty($resolvedCumpleDir) -or [string]::IsNullOrEmpty($resolvedTematicasDir)) {
    Write-Error "Could not resolve original images folders. Aborting."
    exit 1
}

# --- 1. PROCESS BIRTHDAY SUBTHEMES ---
$birthdaySubthemes = @{
    "Harry Potter"                        = "hp"
    "Aladdin"                             = "aladdin"
    "Alicia en el Pais de las Maravillas" = "alicia"
    "Dinosaurio"                          = "dinosaurio"
    "Encanto"                             = "encanto"
    "Fresita"                             = "fresita"
    "Futbol"                              = "futbol"
    "Toy Story"                           = "toystory"
}

foreach ($folderName in $birthdaySubthemes.Keys) {
    $themeId = $birthdaySubthemes[$folderName]
    $folderPath = Join-Path $resolvedCumpleDir $folderName
    
    if (Test-Path $folderPath) {
        Write-Host ""
        Write-Host "=== Theme: $folderName ($themeId) ===" -ForegroundColor Cyan
        
        $files = Get-ChildItem -Path $folderPath -File | Where-Object { 
            $_.Extension -match "\.(png|jpg|jpeg)$" -and $_.Name -notlike "*vector*" 
        } | Sort-Object Name
        
        for ($i = 0; $i -lt 3; $i++) {
            if ($i -lt $files.Count) {
                $srcFile = $files[$i].FullName
                $destName = if ($i -eq 0) { "cumpleanos_${themeId}.png" } else { "cumpleanos_${themeId}_$($i + 1).png" }
                $destPath = Join-Path $destBase $destName
                
                Crop-And-Resize-Image -SourcePath $srcFile -DestinationPath $destPath
            } else {
                Write-Warning "Not enough images for $folderName. Expected 3, found $($files.Count)."
            }
        }
    } else {
        Write-Warning "Original directory not found: $folderPath"
    }
}

# --- 2. PROCESS MAIN THEMES ---
Write-Host ""
Write-Host "=== Main Themes ===" -ForegroundColor Cyan

# 1. Navidad
$navidadDest = Join-Path $destBase "navidad.png"
Crop-And-Resize-Image -SourcePath $resolvedNavidadSrc -DestinationPath $navidadDest

# 2. Pascuas
$pascuasSrc = Join-Path $resolvedTematicasDir "Pascuas\Captura de pantalla 2026-05-22 145835.png"
$pascuasDest = Join-Path $destBase "pascuas.png"
Crop-And-Resize-Image -SourcePath $pascuasSrc -DestinationPath $pascuasDest

# 3. San Valentin
$valentinSrc = Join-Path $resolvedTematicasDir "San valentin\Captura de pantalla 2026-05-22 150904.png"
$valentinDest = Join-Path $destBase "san_valentin.png"
Crop-And-Resize-Image -SourcePath $valentinSrc -DestinationPath $valentinDest

# 4. Halloween
$halloweenSrc = Join-Path $resolvedTematicasDir "halloween\halloween1.png"
if (!(Test-Path $halloweenSrc)) {
    $halloweenSrc = Join-Path $resolvedTematicasDir "halloween\Captura de pantalla 2026-05-22 150628.png"
}
$halloweenDest = Join-Path $destBase "halloween.png"
Crop-And-Resize-Image -SourcePath $halloweenSrc -DestinationPath $halloweenDest

# 5. Baby Shower
$babyshowerSrc = Join-Path $resolvedTematicasDir "Babyshower\Captura de pantalla 2026-05-22 151221.png"
$babyshowerDest = Join-Path $destBase "babyshower.png"
Crop-And-Resize-Image -SourcePath $babyshowerSrc -DestinationPath $babyshowerDest

Write-Host ""
Write-Host "COMPLETED SUCCESSFULLY!" -ForegroundColor Green
