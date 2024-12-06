console.log("Current Directory:", __dirname);
console.log("File Name:", __filename);

if( process.env.MY_VAR==='' ) {
  console.log("Note: To set the `MY_VAR` global environment variable, run 'export MY_VAR=\"Hello World!\"' command in terminal before running this script!")
} else {
  console.log("MY_VAR:", process.env.MY_VAR)
}