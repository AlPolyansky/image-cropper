const path = require('path')

// Create config
function createPath (root) {
  // Frontend Paths
  const frontRoot = path.resolve(root, 'frontend/src')
  const frontFiles = path.resolve(frontRoot, 'assets')
  const frontImg = path.resolve(frontRoot, 'images')
  const frontStyle = path.resolve(frontRoot, 'styles')

  // Server Paths
  const serveRoot = path.resolve(root, 'server')
  const serverFiles = path.resolve(serveRoot, 'static')

  return {
    front: {
      root: frontRoot,
      files: frontFiles,
      img: frontImg,
      style: frontStyle
    },
    server: {
      root: serveRoot,
      files: serverFiles
    }
  }
}

// Output Class
class Paths {
  constructor (root) {
    return {
      root,
      ...createPath(root)
    }
  }
}

module.exports = Paths
