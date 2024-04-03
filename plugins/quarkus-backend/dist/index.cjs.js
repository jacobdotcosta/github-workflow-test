'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var pluginScaffolderNode = require('@backstage/plugin-scaffolder-node');
var fs = require('fs-extra');
var backendCommon = require('@backstage/backend-common');
var axios = require('axios');
var path = require('path');
var JSZip = require('jszip');
var yaml = require('yaml');
var isomorphicGit = require('isomorphic-git');
var http = require('isomorphic-git/http/node');
var xmldom = require('@xmldom/xmldom');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var JSZip__default = /*#__PURE__*/_interopDefaultLegacy(JSZip);
var yaml__default = /*#__PURE__*/_interopDefaultLegacy(yaml);
var http__default = /*#__PURE__*/_interopDefaultLegacy(http);

const examples$1 = [
  {
    description: "Generate a quarkus application using code.quarkus.io",
    example: yaml__default["default"].stringify({
      steps: [
        {
          action: "quarkus:app:create",
          id: "quarkus-app-create",
          name: "Create a Quarkus app",
          input: {
            values: {
              streamKey: "io.quarkus.platform:3.8",
              groupId: "io.quarkus",
              artifactId: "cool-demo",
              version: "1.0",
              buildTool: "MAVEN",
              javaVersion: "17",
              infoEndpoint: "true",
              extensions: ["quarkus-resteasy-reactive-jackson", "quarkus-kubernetes", "io.quarkus:quarkus-hibernate-orm-panache"],
              starterCode: "true"
            }
          }
        }
      ]
    })
  }
];

const createQuarkusApp = () => {
  return pluginScaffolderNode.createTemplateAction({
    id: "quarkus:app:create",
    description: "Generates a Quarkus application using code.quarkus.io and extensions selected",
    examples: examples$1,
    schema: {
      input: {
        type: "object",
        properties: {
          quarkusVersion: {
            title: "quarkusVersion",
            description: "The version of the quarkus framework",
            type: "string"
          },
          groupId: {
            title: "groupId",
            description: "The maven groupId",
            type: "string"
          },
          artifactId: {
            title: "artifactId",
            description: "The maven artifactId",
            type: "string"
          },
          version: {
            title: "version",
            description: "The maven version",
            type: "string"
          },
          buildTool: {
            title: "buildTool",
            description: "The java buildTool to be used: maven, gradle or gradle-kotlin-dsl",
            type: "string",
            enum: ["MAVEN", "GRADLE", "GRADLE_KOTLIN_DSL"]
          },
          javaVersion: {
            title: "javaVersion",
            description: "The JDK version (e.g: 11)",
            type: "string"
          },
          targetPath: {
            title: "targetPath",
            description: "The targetPath under the workspace",
            type: "string"
          },
          extensions: {
            title: "extensions",
            description: "The Quarkus extensions to be added to the project generated",
            type: "array",
            items: {
              type: "string"
            }
          },
          additionalProperties: {
            title: "additionalProperties",
            description: "Quarkus properties to be added to src/main/resources/application.properties",
            type: "string"
          },
          database: {
            title: "database",
            description: "The backend database to be connected for Hibernate, Panache, JPA, etc extensions",
            type: "string"
          },
          infoEndpoint: {
            title: "infoEndpoint",
            description: "The information endpoint",
            type: "boolean"
          },
          healthEndpoint: {
            title: "healthEndpoint",
            description: "The health endpoint",
            type: "boolean"
          },
          metricsEndpoint: {
            title: "metricsEndpoint",
            description: "The metrics endpoint",
            type: "boolean"
          },
          starterCode: {
            title: "starterCode",
            description: "Generate for the project some code to start ?",
            type: "boolean"
          }
        }
      }
    },
    async handler(ctx) {
      const apiUrl = "https://code.quarkus.io/api/download";
      const allExtensions = ctx.input.values.extensions ? ctx.input.values.extensions : [];
      let noCode = "false";
      if (ctx.input.values.infoEndpoint) {
        allExtensions.push("quarkus-info");
      }
      if (ctx.input.values.metricsEndpoint) {
        allExtensions.push("quarkus-micrometer");
        allExtensions.push("quarkus-micrometer-registry-prometheus");
      }
      if (ctx.input.values.healthEndpoint) {
        allExtensions.push("quarkus-smallrye-health");
      }
      if (ctx.input.values.database && ctx.input.values.database !== "none") {
        allExtensions.push(ctx.input.values.database);
      }
      if (!ctx.input.values.starterCode) {
        noCode = "true";
      }
      const postData = {
        streamKey: ctx.input.values.quarkusVersion ? ctx.input.values.quarkusVersion : "io.quarkus.platform:3.8",
        groupId: ctx.input.values.groupId ? ctx.input.values.groupId : "org.acme",
        artifactId: ctx.input.values.artifactId ? ctx.input.values.artifactId : "code-with-quarkus",
        version: ctx.input.values.version ? ctx.input.values.version : "1.0.0-SNAPSHOT",
        buildTool: ctx.input.values.buildTool ? ctx.input.values.buildTool : "MAVEN",
        javaVersion: ctx.input.values.javaVersion ? ctx.input.values.javaVersion : "17",
        extensions: allExtensions,
        noCode
      };
      const appDirName = ctx.input.values.artifactId ? ctx.input.values.artifactId : "code-with-quarkus";
      const headers = {
        "Content-Type": "application/json",
        // Adjust as needed
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*"
      };
      await axios__default["default"].post(apiUrl, postData, { responseType: "arraybuffer", headers }).then((response) => {
        var _a;
        if (response.status === 200 && response.headers["content-type"] === "application/zip") {
          const zipData = response.data;
          const targetPath = (_a = ctx.input.values.targetPath) != null ? _a : "./";
          const outputDir = backendCommon.resolveSafeChildPath(ctx.workspacePath, targetPath);
          ctx.createTemporaryDirectory().then((tempDir) => {
            const zipFilePath = path__default["default"].join(tempDir, "downloaded.zip");
            fs__default["default"].writeFileSync(zipFilePath, zipData);
            fs__default["default"].readFile(zipFilePath, function(err, data) {
              if (!err) {
                const zip = new JSZip__default["default"]();
                zip.loadAsync(data).then(function(contents) {
                  Object.keys(contents.files).forEach(function(filename) {
                    const zipFile = zip.file(filename);
                    if (zipFile) {
                      zipFile.async("nodebuffer").then(function(content) {
                        if (filename.startsWith(appDirName)) {
                          filename = filename.replace(appDirName + "/", "");
                        }
                        const dest = path__default["default"].join(outputDir, filename);
                        fs__default["default"].promises.mkdir(path__default["default"].dirname(dest), { recursive: true }).then(() => {
                          fs__default["default"].writeFileSync(dest, content);
                        });
                      });
                    }
                  });
                });
              }
            });
          });
          if (ctx.input.values.additionalProperties) {
            const propertiesPath = path__default["default"].join(outputDir, "src/main/resources/application.properties");
            const propertiesContent = fs__default["default"].readFileSync(propertiesPath, "utf8");
            const updatedPropertiesContent = `${propertiesContent}
${ctx.input.values.additionalProperties}`;
            fs__default["default"].writeFileSync(propertiesPath, `${updatedPropertiesContent}`);
          }
        }
      }).catch((error) => {
        console.error("Error making HTTP POST request:", error);
      });
    }
  });
};

const examples = [
  {
    description: "Clones a Quarkus quickstart project from: https://github.com/quarkusio/quarkus-quickstarts.",
    example: yaml__default["default"].stringify({
      steps: [
        {
          action: "quarkus:quickstart:clone",
          id: "quarkus-quickstart-clone",
          name: "Clone a quickstart project",
          input: {
            values: {
              groupId: "io.quarkus",
              artifactId: "cool-demo",
              version: "1.0",
              quickstartName: "hibernate-orm-quickstart"
            }
          }
        }
      ]
    })
  }
];

const cloneQuarkusQuickstart = () => {
  return pluginScaffolderNode.createTemplateAction({
    id: "quarkus:quickstart:clone",
    description: "Clones a Quarkus quickstart project from: https://github.com/quarkusio/quarkus-quickstarts",
    examples,
    schema: {
      input: {
        type: "object",
        properties: {
          groupId: {
            title: "groupId",
            description: "The maven groupId",
            type: "string"
          },
          artifactId: {
            title: "artifactId",
            description: "The maven artifactId",
            type: "string"
          },
          version: {
            title: "version",
            description: "The maven version",
            type: "string"
          },
          targetPath: {
            title: "targetPath",
            description: "The targetPath under the workspace",
            type: "string"
          },
          additionalProperties: {
            title: "additionalProperties",
            description: "Quarkus properties to be added to src/main/resources/application.properties",
            type: "string"
          },
          quickstartName: {
            title: "quickstartName",
            description: "The name of the quickstart github project to be cloned",
            type: "string"
          },
          database: {
            title: "database",
            description: "The backend database to be connected for Hibernate, Panache, JPA, etc extensions",
            type: "string"
          },
          infoEndpoint: {
            title: "infoEndpoint",
            description: "The information endpoint",
            type: "boolean"
          },
          healthEndpoint: {
            title: "healthEndpoint",
            description: "The health endpoint",
            type: "boolean"
          },
          metricsEndpoint: {
            title: "metricsEndpoint",
            description: "The metrics endpoint",
            type: "boolean"
          }
        }
      }
    },
    async handler(ctx) {
      var _a;
      const targetPath = (_a = ctx.input.values.targetPath) != null ? _a : "./";
      const outputDir = backendCommon.resolveSafeChildPath(ctx.workspacePath, targetPath);
      const groupId = ctx.input.values.groupId;
      const artifactId = ctx.input.values.artifactId;
      const version = ctx.input.values.version;
      ctx.createTemporaryDirectory().then((tempDir) => {
        const cloneDir = path__default["default"].join(tempDir, "downloaded.zip");
        isomorphicGit.clone({
          fs: fs__default["default"],
          http: http__default["default"],
          dir: cloneDir,
          url: `https://github.com/quarkusio/quarkus-quickstarts.git`,
          noTags: true,
          singleBranch: true
          // Optional: Only clone a single branch (default is false)
        }).then(() => {
          const quickstartDir = path__default["default"].join(cloneDir, ctx.input.values.quickstartName);
          fs__default["default"].copySync(quickstartDir, ctx.workspacePath);
          const pomPath = path__default["default"].join(outputDir, "pom.xml");
          const xml = fs__default["default"].readFileSync(pomPath, "utf8");
          const parser = new xmldom.DOMParser();
          const doc = parser.parseFromString(xml, "text/xml");
          if (groupId !== void 0) {
            doc.getElementsByTagName("groupId")[0].textContent = groupId;
          }
          if (artifactId !== void 0) {
            doc.getElementsByTagName("artifactId")[0].textContent = artifactId;
          }
          if (version !== void 0) {
            doc.getElementsByTagName("version")[0].textContent = version;
          }
          const serializer = new xmldom.XMLSerializer();
          fs__default["default"].writeFileSync(pomPath, serializer.serializeToString(doc));
          if (ctx.input.values.additionalProperties) {
            const propertiesPath = path__default["default"].join(outputDir, "src/main/resources/application.properties");
            const propertiesContent = fs__default["default"].readFileSync(propertiesPath, "utf8");
            const updatedPropertiesContent = `${propertiesContent}
${ctx.input.values.additionalProperties}`;
            fs__default["default"].writeFileSync(propertiesPath, `${updatedPropertiesContent}`);
          }
        });
      });
    }
  });
};

exports.cloneQuarkusQuickstart = cloneQuarkusQuickstart;
exports.createQuarkusApp = createQuarkusApp;
//# sourceMappingURL=index.cjs.js.map
