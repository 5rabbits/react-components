#!/usr/bin/env node

const program = require('commander')
const lodash = require('lodash')
const fs = require('fs-extra')
const path = require('path')
const camelCase = require('uppercamelcase')
const readDir = require('recursive-readdir')
const directoryExists = require('directory-exists')
const validateNpmPackageName = require('validate-npm-package-name')
const chalk = require('chalk')
const ora = require('ora')
const childProcess = require('child_process')
const pkg = require('../../package.json')

lodash.templateSettings.interpolate = /<%=([\s\S]+?)%>/g

const spinner = ora()
const originalCwd = process.cwd()
let libraryName
let packageName
let componentName
let templatePath
let projectCwd

program
  .version(pkg.version)
  .arguments('<library-name>')
  .action(name => {
    createProject(name)
  })

program.parse(process.argv)

if (!libraryName) {
  program.help()
}

function validateLibraryName() {
  const validation = validateNpmPackageName(libraryName)

  if (validation.errors) {
    console.error(chalk.red('Package name can only contain URL-friendly characters'))
    process.exit(1)
  }
}

function validateProjectDir() {
  const exists = directoryExists.sync(projectCwd)

  if (exists) {
    console.error(chalk.red(`Package ${libraryName} already exists`))
    process.exit(1)
  }
}

function createProject(name) {
  console.log('')
  console.log(`${chalk.yellow(pkg.name)} v${pkg.version}\n`)

  libraryName = name
  componentName = camelCase(libraryName)
  projectCwd = path.join(process.cwd(), 'packages', libraryName)
  templatePath = path.resolve(__dirname, 'template')

  validateLibraryName()
  validateProjectDir()

  packageName = `@5rabbits/${libraryName}`

  createProjectFiles()
    .then(installDependencies)
    .then(printSuccess)
}

function printSuccess() {
  console.log('')
  console.log(chalk.green(`🦄  Your new package @5rabbits/${chalk.bold(libraryName)} is ready to start!`))

  console.log('')
  console.log(chalk.underline('What now?'))

  console.log('')
  console.log('🤯  Move to the package directory')
  console.log(chalk.cyan(`  $ cd packages/${libraryName}`))

  console.log('')
  console.log('🤖  Start developing')
  console.log(chalk.cyan('  $ yarn start'))

  console.log('')
  console.log('🐛  Run the tests')
  console.log(chalk.cyan('  $ yarn test --watch'))

  return Promise.resolve()
}

function installDependencies() {
  spinner.start('Installing dependencies')

  return projectExec('yarn')
    .then(() => spinner.succeed('Dependencies installed'))
}

function createProjectFiles(name) {
  return new Promise(resolve => {
    spinner.start(`Creating package ${chalk.bold(libraryName)}`)

    const templateValues = {
      libraryName,
      packageName,
      componentName,
    }

    readDir(templatePath)
      .then(files => {
        files.forEach(file => {
          const filePath = file.replace(templatePath, '')
          const fileContents = fs.readFileSync(file)

          fs.outputFileSync(
            path.join(projectCwd, evaluateFilePath(filePath)),
            lodash.template(fileContents)(templateValues)
          )
        })

        spinner.succeed(`Package ${chalk.bold(libraryName)} created`)
        resolve()
      })
  })
}

function exec(command, options) {
  return new Promise((resolve, reject) => {
    childProcess.exec(command, options, function(error, stdout) {
      if (error) {
        reject(error)
      }
      else {
        resolve(stdout)
      }
    })
  })
}

function projectExec(command) {
  return exec(command, { cwd: projectCwd })
}

function evaluateFilePath(filePath) {
  return filePath
    .replace(/_COMPONENT_/g, componentName)
    .replace(/_RENAME_/g, '')
}
