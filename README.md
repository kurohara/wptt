# wptt, the WordPress Template Template.

This is a phpjade template for WordPress template.  
Dummy port from the 'Twenty Fifteen' theme which bundled with WordPress.

## Getting Started
1. Get this source from github.
```shell
git clone https://github.com/kurohara/wptt
```
2. Run setup script
```
grunt setup
```
You will see some questions from setup script, answer  
a) the name of theme.  
b) the name of author.  
c) the location where to put compiled theme files.  
Or you can edit 'wpttenv.json' file directory.
```json
{
  "name": "mytheme",
  "uri": "",
  "author": "Hiroyoshi Kurohara(Microgadget,inc.)",
  "authoruri": "",
  "description": "",
  "version": "1.0.0",
  "license": "GNU General Public License v2 or later",
  "licenseuri": "http://www.gnu.org/licenses/gpl-2.0.html",
  "tags": "",
  "themedir": "./theme",
  "jadedir": "./src",
  "styldir": "./src",
  "prebuilt": "./src",
  "tmpdir": "./tmp"
}
```
The 'wpttenv.json' file contains the information of your new theme.  
## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
1.0.0 Jun 09 2015

## License
The 'src' directory is Licensed under the 'Gnu General Public License Version 2' (see src/LICENSE.txt).  
The license of produced theme is same as 'src'.  
(Currently, it may possible to use another license for produced files, but I'm not sure about this.)

Other files are:  
Copyright (c) 2015 Hiroyoshi Kurohara  
Licensed under the MIT license.  

## Related projects
* [phpjade](https://github.com/kurohara/phpjade)  
* [grunt-jade-mod](https://github.com/kurohara/grunt-jade-mod)  
Grunt task module for Jade with modifier support, phpjade can be used with this module.
* [jade-mod-cli](https://github.com/kurohara/jade-mod-cli)  
Jade cli with modifier support, phpjade can be used with this.
