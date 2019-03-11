const path = require('path');
const fs = require('fs');
const fsPromise = fs.promises;
const argv = process.argv.slice(2);

const PARAM_PATH = {
  'p': {
    path: '../src/pages',
    template: './template.txt',
    cssTemplate: './css.txt'
  },
  'pc': {
    path: '../src/pureComponents',
    template: './template.txt',
    cssTemplate: './css.txt'
  },
  'c': {
    path: '../src/components',
    template: './template.txt',
    cssTemplate: './css.txt'
  }
}

async function start () {
  if ( argv.length === 0 ) {
    return console.log('请输入正确参数!')
  }

  // let newfilepath = ''
  // if (!argv.includes('-n')) {
  //     if (PARAM_PATH[filePath]) {
  //         newfilepath = PARAM_PATH[filePath];
  //     } else {
  //         Object.entries(PARAM_PATH).forEach((item) => console.log(item[0], item[1]))
  //         return console.log('请输入正确的路径参数!');
  //     }
  //     if (!fileName) {
  //         return console.log('请输入一个文件名');
  //     }
  // } else {
  //     newfilepath = filePath;
  // }

  const argv_filePath = argv[ 0 ];
  const argv_fileName = argv[ 1 ];
  const argv_componentName = argv[ 2 ];
  const cn = argv_componentName || argv_fileName;

  const mkComponentName = cn[ 0 ].toLocaleUpperCase() + cn.substring(1);

  const mkType = PARAM_PATH[ argv_filePath ];

  const dirPathName = path.join(__dirname, mkType.path, argv_fileName);


  mkComponent(dirPathName, mkComponentName, mkType.template, mkType.cssTemplate);
}

start();

async function mkComponent ( dir, componentName, templatePath, cssTemplate ) {

  const mkFilePath = ( file ) => path.join(dir, file);

  await fsPromise.mkdir(dir);


  await fsPromise.writeFile(mkFilePath('index.module.css'), await fsPromise.readFile(path.join(__dirname, cssTemplate), 'utf8'));

  await fsPromise.writeFile(mkFilePath('index.module.css.d.ts'), 'export const container:string;')

  const template = await fsPromise.readFile(path.join(__dirname, templatePath), 'utf8');

  const context = template.replace('{%ComponentName%}', componentName)


  await fsPromise.writeFile(mkFilePath('index.tsx'), context)

  const text = await fsPromise.readFile(path.join(__dirname, '../src/router/pages.ts'), 'utf8');

  const test_array = text.split('\n');

  const copy_text = [];

  for ( let item of test_array ) {
    if ( item === '// import component' ) {
      const relative_Path = path.relative(path.join(__dirname, '../src/router/pages.ts'), dir);
      // 路径老是有问题
      copy_text.push(`import { ${componentName} } from "${ relative_Path.substring(3) }";`)
      copy_text.push('// import component')
    } else if ( item === '// routing-table' ) {

      copy_text.push(`  "${componentName.toLocaleUpperCase()}": {`);
      copy_text.push(`    component: ${componentName},`);
      copy_text.push(`    name: '${componentName.toLocaleLowerCase()}',`);
      copy_text.push(`    path: '${componentName.toLocaleLowerCase()}'`);
      copy_text.push('  },')
      copy_text.push('// routing-table')
    } else {
      copy_text.push(item);
    }
  }


  await fsPromise.writeFile(path.join(__dirname, '../src/router/pages.ts'), copy_text.join('\n'))

}