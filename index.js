const minimist = require('minimist')
const fs = require("fs")
const path = require('path')
const lcov2badge = require("lcov2badge")

const args = minimist(process.argv.slice(2))

if (args['p'] || args['path']) {
  const pathFile = args['p'] || args['path']
  if (fs.existsSync(pathFile)) {
    console.log(`[INFO] Path file: ${pathFile}`)
    const fileName = path.basename(pathFile)

    if (fileName == 'lcov.info') {
      console.log(`[INFO] Filename: ${fileName}`)

      lcov2badge.badge(pathFile, (err, svgBadge) => {
        if (err) console.error(err)

        try {
          if (fs.existsSync("./coverage_badge.svg")) {
            fs.unlinkSync("./coverage_badge.svg")
            console.log("[INFO] remove old file")
          }
        } catch (err) {
          console.error(err)
        }

        console.log("[INFO] generate coverage image")
        fs.writeFile("./coverage_badge.svg", svgBadge, (_) =>
          console.log("[INFO] complete")
        )
      })
    } else {
      console.error('[ERROR] Invalid lcov file name')
    }
  } else {
    console.error('[ERROR] Invalid path file')
  }
} else {
  console.error('[ERROR] Invalid arguments')
}
