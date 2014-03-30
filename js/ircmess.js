/*
 * Copyright (c) 2013-2014, Sam Dodrill
 * Copyright (c) 2014, Andrew Cook
 * All rights reserved.
 *
 * This software is provided 'as-is', without any express or implied
 * warranty. In no event will the authors be held liable for any damages
 * arising from the use of this software.
 *
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 *
 *     1. The origin of this software must not be misrepresented; you must not
 *     claim that you wrote the original software. If you use this software
 *     in a product, an acknowledgment in the product documentation would be
 *     appreciated but is not required.
 *
 *     2. Altered source versions must be plainly marked as such, and must not be
 *     misrepresented as being the original software.
 *
 *     3. This notice may not be removed or altered from any source
 *     distribution.
 */

function IRCLine(line, p10) {
    if(p10 === undefined)
        p10 = false
    /*
     * Constructor for an IRCLine. Takes in the line you want to parse and if
     * the line is a P10 line or not. Sets the following attributes:
     * 
     * self.line: A copy of the raw line
     * self.p10: True if the line is a P10 line or False if not
     * self.verb: The command verb lf the line
     * self.source: The source of the command or None
     * self.args: Arguments to the command verb
     */

    this.line = line

    var splitline = line.split(' ')

    this.p10 = p10

    var args = []

    if (p10) {
        this.source = splitline[0]
        this.verb = splitline[1]
        args = splitline.splice(2)
    } else {
        if (line[0] == ":") {
            this.source = splitline[0].slice(1)
            this.verb = splitline[1]
            args = splitline.splice(2)
        } else {
            this.source = null
            this.verb = splitline[0]
            args = splitline.splice(1)
        }
    }
    for (var index in args)
        if (args[index][0] == ":") 
    {
        var arg = args.splice(index).join(" ")
        arg = arg.slice(1)
        args = args.splice(0, index)

        args.push(arg)
        break
    }

    this.args = args
}

IRCLine.prototype.toString = function () {
    return this.line
}
