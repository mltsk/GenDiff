import _ from 'lodash';

const stylish = (obj, symbol, offset) => {
    
    const getNumberSpace = (property, offset) => {
        return property.split('.').length * offset;
    }

    const makeSpace = (number, symbol, correction = 0) => {
        return symbol.repeat(number + correction);
    }

    const getPrefix = (status) => {
        const prefix = {added: '+ ', removed: '- ', unchanged: '  '}
        return prefix[status];
    }

    const objectStylish = (obj, startSpace, offset) => {
        let result = ``;

        const f = (result, obj, startSpace, offset) => {
            const spaces = startSpace + offset;
            result = `{\n`;

            for (let [key, value] of Object.entries(obj)) {
                if(typeof(value) === 'object') {
                    value = f(result ,value, spaces, offset)
                    result += `${makeSpace(spaces, symbol)}${key}:${value}`;
                } else {
                    result += `${makeSpace(spaces, symbol)}${key}:${value}\n`;
                    result += `${makeSpace(spaces, symbol)}}\n`;
                }
            }
            
            return result;
        }
        
        result += f(result, obj, startSpace, offset)

        // result += `${makeSpace(spaces, symbol)}}`
        return result;
    }



    let result = `{\n`;
    obj.map((item) => {
        const numberSpace = getNumberSpace(item.property, offset)
        const spaces = makeSpace(numberSpace, symbol, -2);

        let value = item.value;
        

        if(typeof(item.children) === 'object') {
            value = stylish(item.children, symbol, offset)
            result += `${spaces}${getPrefix(item.status)}${item.name}:${value}`;
        }
        else  if(typeof(value) === 'object') {
            value = objectStylish(value, numberSpace, offset)
            result += `${spaces}${getPrefix(item.status)}${item.name}:${value}`;
        }
        

        if (item.status === 'updated') {
            result += `${spaces}${getPrefix('removed')}${item.name}:${value}\n`;
            result += `${spaces}${getPrefix('added')}${item.name}:${value}\n`;
        } else {
            result += `${spaces}${getPrefix(item.status)}${item.name}:${value}\n`;
            
        }
    });
    result += `{`
    console.log(result);
    // console.log(obj);
}

export default stylish;