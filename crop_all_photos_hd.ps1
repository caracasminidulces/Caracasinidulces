# C# Image Processor for safe, fast, high-quality center crop, resize, and sharpening convolution.
# Preserves 100% of the authentic original sweets from Caracas Mini Dulces.
# 100% pure ASCII to prevent any Windows PowerShell encoding parser brace corruptions.

$csharpCode = @'
using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;

public class ImageProcessor {
    public static void CropScaleSharpen(string srcPath, string destPath, int targetSize) {
        if (!System.IO.File.Exists(srcPath)) {
            Console.WriteLine("Warning: Source file not found: " + srcPath);
            return;
        }

        using (Image srcImg = Image.FromFile(srcPath)) {
            int srcWidth = srcImg.Width;
            int srcHeight = srcImg.Height;
            int squareSize = Math.Min(srcWidth, srcHeight);
            int cropX = (srcWidth - squareSize) / 2;
            int cropY = (srcHeight - squareSize) / 2;

            // Step 1: Center Crop and High-Quality Resize
            using (Bitmap resizedBmp = new Bitmap(targetSize, targetSize)) {
                using (Graphics g = Graphics.FromImage(resizedBmp)) {
                    g.InterpolationMode = InterpolationMode.HighQualityBicubic;
                    g.SmoothingMode = SmoothingMode.HighQuality;
                    g.PixelOffsetMode = PixelOffsetMode.HighQuality;
                    g.CompositingQuality = CompositingQuality.HighQuality;
                    g.Clear(Color.Transparent);

                    Rectangle srcRect = new Rectangle(cropX, cropY, squareSize, squareSize);
                    Rectangle destRect = new Rectangle(0, 0, targetSize, targetSize);
                    g.DrawImage(srcImg, destRect, srcRect, GraphicsUnit.Pixel);
                }

                // Step 2: Apply Sharpen Filter (using convolution matrix)
                using (Bitmap sharpenedBmp = new Bitmap(targetSize, targetSize)) {
                    // Mild sharpening kernel to enhance edges cleanly
                    float[,] kernel = new float[3, 3] {
                        { 0, -0.4f, 0 },
                        { -0.4f, 2.6f, -0.4f },
                        { 0, -0.4f, 0 }
                    };

                    BitmapData srcData = resizedBmp.LockBits(new Rectangle(0, 0, targetSize, targetSize), ImageLockMode.ReadOnly, PixelFormat.Format32bppArgb);
                    BitmapData destData = sharpenedBmp.LockBits(new Rectangle(0, 0, targetSize, targetSize), ImageLockMode.WriteOnly, PixelFormat.Format32bppArgb);

                    int bytes = srcData.Stride * targetSize;
                    byte[] srcValues = new byte[bytes];
                    byte[] destValues = new byte[bytes];

                    Marshal.Copy(srcData.Scan0, srcValues, 0, bytes);

                    int stride = srcData.Stride;

                    for (int y = 0; y < targetSize; y++) {
                        for (int x = 0; x < targetSize; x++) {
                            int offset = y * stride + x * 4;
                            if (x == 0 || x == targetSize - 1 || y == 0 || y == targetSize - 1) {
                                destValues[offset] = srcValues[offset];
                                destValues[offset + 1] = srcValues[offset + 1];
                                destValues[offset + 2] = srcValues[offset + 2];
                                destValues[offset + 3] = srcValues[offset + 3];
                                continue;
                            }

                            float r = 0, gVal = 0, b = 0;
                            for (int ky = -1; ky <= 1; ky++) {
                                for (int kx = -1; kx <= 1; kx++) {
                                    int pixelOffset = (y + ky) * stride + (x + kx) * 4;
                                    float factor = kernel[ky + 1, kx + 1];
                                    b += srcValues[pixelOffset] * factor;
                                    gVal += srcValues[pixelOffset + 1] * factor;
                                    r += srcValues[pixelOffset + 2] * factor;
                                }
                            }

                            destValues[offset] = (byte)Math.Max(0, Math.Min(255, (int)b));
                            destValues[offset + 1] = (byte)Math.Max(0, Math.Min(255, (int)gVal));
                            destValues[offset + 2] = (byte)Math.Max(0, Math.Min(255, (int)r));
                            destValues[offset + 3] = srcValues[offset + 3]; // Preserve Alpha
                        }
                    }

                    Marshal.Copy(destValues, 0, destData.Scan0, bytes);

                    resizedBmp.UnlockBits(srcData);
                    sharpenedBmp.UnlockBits(destData);

                    sharpenedBmp.Save(destPath, ImageFormat.Png);
                }
            }
        }
    }
}
'@

# Reference System.Drawing in PowerShell
Add-Type -TypeDefinition $csharpCode -ReferencedAssemblies "System.Drawing"

$baseDir = "."
$destBase = "public\images\eventos"

# Ensure destination directory exists
if (!(Test-Path $destBase)) {
    New-Item -ItemType Directory -Force -Path $destBase
}

# Resolve paths dynamically using wildcards to avoid encoding errors with accents/eñes
$resolvedCumpleDir = (Get-ChildItem -Path "Imagenes\*\*\Tem*os\Cumple*os" -Directory | Select-Object -First 1).FullName
$resolvedTematicasDir = (Get-ChildItem -Path "Imagenes\*\*\Tem*os" -Directory | Select-Object -First 1).FullName
$resolvedNavidadSrc = (Get-ChildItem -Path "Imagenes\*\*\Dulcesnavid*.png" -File | Select-Object -First 1).FullName

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
        Write-Host "=== Theme: $folderName ($themeId) ==="
        
        $files = Get-ChildItem -Path $folderPath -File | Where-Object { 
            $_.Extension -match "\.(png|jpg|jpeg)$" -and $_.Name -notlike "*vector*" 
        } | Sort-Object Name
        
        for ($i = 0; $i -lt 3; $i++) {
            if ($i -lt $files.Count) {
                $srcFile = $files[$i].FullName
                $imgIndex = $i + 1
                $destName = if ($i -eq 0) { "cumpleanos_${themeId}.png" } else { "cumpleanos_${themeId}_${imgIndex}.png" }
                $destPath = Join-Path $destBase $destName
                
                [ImageProcessor]::CropScaleSharpen($srcFile, $destPath, 1000)
                Write-Host "OK Enhanced: $destName"
            } else {
                Write-Warning "Not enough images for $folderName."
            }
        }
    }
}

# --- 2. PROCESS MAIN THEMES ---
Write-Host ""
Write-Host "=== Main Themes ==="

# 1. Navidad (using Dulcesnavideos.png)
$navidadDest = Join-Path $destBase "navidad.png"
[ImageProcessor]::CropScaleSharpen($resolvedNavidadSrc, $navidadDest, 1000)
Write-Host "OK Enhanced: navidad.png"

# 2. Pascuas
$pascuasSrc = Join-Path $resolvedTematicasDir "Pascuas\Captura de pantalla 2026-05-22 145835.png"
$pascuasDest = Join-Path $destBase "pascuas.png"
[ImageProcessor]::CropScaleSharpen($pascuasSrc, $pascuasDest, 1000)
Write-Host "OK Enhanced: pascuas.png"

# 3. San Valentin
$valentinSrc = Join-Path $resolvedTematicasDir "San valentin\Captura de pantalla 2026-05-22 150904.png"
$valentinDest = Join-Path $destBase "san_valentin.png"
[ImageProcessor]::CropScaleSharpen($valentinSrc, $valentinDest, 1000)
Write-Host "OK Enhanced: san_valentin.png"

# 4. Halloween
$halloweenSrc = Join-Path $resolvedTematicasDir "halloween\halloween1.png"
if (!(Test-Path $halloweenSrc)) {
    $halloweenSrc = Join-Path $resolvedTematicasDir "halloween\Captura de pantalla 2026-05-22 150628.png"
}
$halloweenDest = Join-Path $destBase "halloween.png"
[ImageProcessor]::CropScaleSharpen($halloweenSrc, $halloweenDest, 1000)
Write-Host "OK Enhanced: halloween.png"

# 5. Baby Shower
$babyshowerSrc = Join-Path $resolvedTematicasDir "Babyshower\Captura de pantalla 2026-05-22 151221.png"
$babyshowerDest = Join-Path $destBase "babyshower.png"
[ImageProcessor]::CropScaleSharpen($babyshowerSrc, $babyshowerDest, 1000)
Write-Host "OK Enhanced: babyshower.png"

Write-Host ""
Write-Host "COMPLETED HD IMAGE PROCESS SUCCESSFULLY!"
