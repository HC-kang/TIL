const handler = {
    get: function(target, name) {
        return name === 'name' ? `${target.a} ${target.b}` : target[name]
    }
}

const p = new Proxy({a: 'FORD', b: 'IS MY NAME'}, handler)
console.log(p.name)

//FORD IS MY NAME
