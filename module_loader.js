function loadModule (filename, module, reqiure) {
    const wrappedSrc = 
        `(function (module, exports, require) {
            ${fs.readFileSync(filename, 'utf8')}
        })(module, module.exports, require)`
    eval(wrappedSrc)
}