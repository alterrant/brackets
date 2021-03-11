module.exports = function check(str, bracketsConfig) {
    let chars = str.split(''),
        stack = [],
        open = ['{', '(', '['],
        close = ['}', ')', ']'],
        closeIndex,
        openIndex,
        senseOfFunction = false;



    for (let i = 0, len = chars.length; i < len; i++) {
        if (bracketsConfig[0][0] === '1' && !open.includes('1')) {
            bracketsConfig.forEach (function(item, index) {
                open.push(item[0]);
                close.push(item[1]);
                if (index >= 3) {
                    close.pop();
                }
            })
        }


        if (chars[i] === '|' && !close.includes('|')) open.push('|');
        if (chars[i] === '7' && !close.includes('7') && !open.includes('7') && !open.includes('8') && !open.includes(' ')) open.push('7');
        if (chars[i] === '7' && !close.includes('7') && !open.includes('7') && open.includes('8') && !open.includes(' ')) {
            open.pop();
            open.push('7');
            open.push('8');
        }
        if (chars[i] === '7' && !close.includes('7') && !open.includes('7') && open.includes('8') && open.includes(' ')) {
            open.pop();
            open.pop();
            open.push('7');
            open.push('8');
        }
        if (chars[i] === '7' && !close.includes('7') && !open.includes('7') && !open.includes('8') && open.includes(' ')) {
            open.pop();
            open.push('7');
        }

        if (chars[i] === '8' && !close.includes('8') && !open.includes('8') && !open.includes(' ') && !open.includes('7')) {
            open.push(' ');
            open.push('8');
        }
        if (chars[i] === '8' && !close.includes('8') && !open.includes('8') && !open.includes(' ') && open.includes('7')) open.push('8');
        if (chars[i] === '8' && !close.includes('8') && !open.includes('8') && open.includes(' ') && !open.includes('7')) open.push('8');

        openIndex = open.indexOf(chars[i]);
        if (openIndex !== -1) {
            stack.push(openIndex);
            senseOfFunction = true;

            if (stack.includes(3) && open.length === 4) {
                open.pop();
                close.push('|');
            }


            if (stack.includes(6) && open.includes('7') && open.includes('8')) {
                open.pop();
                open.pop();
                open.push(' ');
                open.push('8');
                if (close.includes('8') && !close.includes(' ')) {
                    close.pop();
                    close.push('7');
                    close.push('8');
                } else if (close.includes('8') && close.includes(' ')) {
                    close.pop();
                    close.pop();
                    close.push('7');
                    close.push('8');
                } else if (!close.includes('8') && !close.includes(' ')) {
                    close.push('7');
                }
            }
            if (stack.includes(6) && open.includes('7') && !open.includes('8')) {
                open.pop();
                if (close.includes('8') && !close.includes(' ')) {
                    close.pop();
                    close.push('7');
                    close.push('8');
                } else if (close.includes('8') && close.includes(' ')) {
                    close.pop();
                    close.pop();
                    close.push('7');
                    close.push('8');
                } else if (!close.includes('8') && !close.includes(' ')) {
                    close.push('7');
                } else if (!close.includes('8') && close.includes((' '))){
                    close.pop();
                    close.push('7');
                }
            }
            if (stack.includes(7) && open.includes('8')) {
                open.pop();
                if (close.includes('7') || close.includes(' ')) {
                    close.push('8');
                } else if (!close.includes('7') || !close.includes(' ')) {
                    close.push(' ');
                    close.push('8');
                }
            }

            continue;
        }

        closeIndex = close.indexOf(chars[i]);
        if (closeIndex !== -1) {
            senseOfFunction = true;
            openIndex = stack.pop();
            if (closeIndex !== openIndex) {
                return false;
            }
        }
        if (close.includes('|') && !stack.includes(3)) {
            close.pop();
        }
        if (close.includes('7') && !stack.includes(6)) { 
            if (close.includes('8')) {
                close.pop();
                close.pop();
                close.push(' ');
                close.push('8');
            } else {
                close.pop();
            }
        }
        if (close.includes('8') && !stack.includes(7)) {
            close.pop();
        }
    }

    if (stack.length !== 0) {
        return false;
    }

    if (senseOfFunction) return true
    else return false;
}
