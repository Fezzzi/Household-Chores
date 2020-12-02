const ignoreImports = () => null

process.env.MOCHA_TEST = true

require.extensions['.css'] = ignoreImports
require.extensions['.png'] = ignoreImports
require.extensions['.jpg'] = ignoreImports
require.extensions['.svg'] = ignoreImports
require.extensions['.svgr'] = ignoreImports
