module.exports = (plop) => {
  plop.setGenerator('Component', {
    description: 'Create a reusable component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: "What is your component's name?"
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.tsx',
        templateFile: 'plop-templates/Component/component.js.hbs'
      },

      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/index.ts',
        templateFile: 'plop-templates/Component/index.js.hbs'
      },
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/types.ts',
        templateFile: 'plop-templates/Component/types.js.hbs'
      },
      {
        type: 'add',
        path: 'src/components/index.ts',
        templateFile: 'plop-templates/index.js.hbs',
        skipIfExists: true
      },
      {
        type: 'append',
        path: 'src/components/index.ts',
        pattern: `/* PLOP_INJECT_EXPORT */`,
        template: `export { {{pascalCase name}} } from './{{pascalCase name}}';`
      }
    ]
  });

  plop.setGenerator('Hook', {
    description: 'Create a custom react hook',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: "What is your hook's name?"
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/hooks/{{camelCase name}}.ts',
        templateFile: 'plop-templates/Hook/hook.js.hbs'
      },
      {
        type: 'add',
        path: 'src/hooks/index.ts',
        templateFile: 'plop-templates/index.js.hbs',
        skipIfExists: true
      },
      {
        type: 'append',
        path: 'src/hooks/index.ts',
        pattern: `/* PLOP_INJECT_EXPORT */`,
        template: `export { {{camelCase name}} } from './{{camelCase name}}';`
      }
    ]
  });

  plop.setGenerator('Util', {
    description: 'Create a custom util',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: "What is your util's name?"
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/utils/{{camelCase name}}.ts',
        templateFile: 'plop-templates/Utils/util.js.hbs'
      },
      {
        type: 'add',
        path: 'src/utils/index.ts',
        templateFile: 'plop-templates/index.js.hbs',
        skipIfExists: true
      },
      {
        type: 'append',
        path: 'src/utils/index.ts',
        pattern: `/* PLOP_INJECT_EXPORT */`,
        template: `export { {{camelCase name}} } from './{{camelCase name}}';`
      }
    ]
  });

  plop.setGenerator('View', {
    description: 'Create a custom view',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: "What is your view's name?"
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/views/{{pascalCase name}}.tsx',
        templateFile: 'plop-templates/View/view.js.hbs'
      },
      {
        type: 'add',
        path: 'src/views/index.ts',
        templateFile: 'plop-templates/index.js.hbs',
        skipIfExists: true
      },
      {
        type: 'add',
        path: 'cypress/integration/{{pascalCase name}}/{{pascalCase name}}.test.tsx',
        templateFile: 'plop-templates/View/view.test.js.hbs'
      },
      {
        type: 'append',
        path: 'src/views/index.ts',
        pattern: `/* PLOP_INJECT_EXPORT */`,
        template: `export { {{pascalCase name}} } from './{{pascalCase name}}';`
      }
    ]
  });
};
