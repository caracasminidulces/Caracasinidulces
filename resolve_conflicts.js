const fs = require('fs');
const path = require('path');

const files = [
  path.join(__dirname, 'components', 'AssistantChat.tsx'),
  path.join(__dirname, 'components', 'EventPlannerWizard.tsx')
];

files.forEach(filePath => {
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  
  // Regex to match Git conflict blocks:
  // <<<<<<< HEAD
  // [HEAD content]
  // =======
  // [Incoming content]
  // >>>>>>> [branch/commit details]
  const conflictRegex = /<<<<<<< HEAD\r?\n([\s\S]*?)\r?\n=======\r?\n([\s\S]*?)\r?\n>>>>>>> [^\r\n]+/g;
  
  let matchesCount = 0;
  const resolvedContent = content.replace(conflictRegex, (match, headContent, incomingContent) => {
    matchesCount++;
    // We choose HEAD because it has our latest verified updates, 6.5s delay, and purified gourmet text
    return headContent;
  });

  if (matchesCount > 0) {
    fs.writeFileSync(filePath, resolvedContent, 'utf8');
    console.log(`Successfully resolved ${matchesCount} conflict(s) in ${path.basename(filePath)} choosing the HEAD changes.`);
  } else {
    console.log(`No Git conflicts found in ${path.basename(filePath)}.`);
  }
});
