const ignoreImports = () => null;

require.extensions['.css'] = ignoreImports;
require.extensions['.png'] = ignoreImports;
require.extensions['.jpg'] = ignoreImports;
require.extensions['.svg'] = ignoreImports;
require.extensions['.svgr'] = ignoreImports;
