import { createRouteRef, createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';
import React__default, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, Box, Typography, CircularProgress, SvgIcon } from '@material-ui/core';
import CheckCircle from '@material-ui/icons/CheckCircle';
import AccessTime from '@material-ui/icons/AccessTime';
import HighlightOff from '@material-ui/icons/HighlightOff';

const rootRouteRef = createRouteRef({
  id: "quarkus-console"
});

const QuarkusConsolePlugin = createPlugin({
  id: "quarkus-console",
  routes: {
    root: rootRouteRef
  }
});
const QuarkusConsolePage = QuarkusConsolePlugin.provide(
  createRoutableExtension({
    name: "QuarkusPage",
    component: () => import('./QuarkusPage-9ec6ae48.esm.js').then((m) => m.default),
    mountPoint: rootRouteRef
  })
);

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
function deploymentToApplication(deployment) {
  var _a, _b;
  return {
    kind: "Deployment",
    metadata: deployment == null ? void 0 : deployment.metadata,
    spec: (_b = (_a = deployment == null ? void 0 : deployment.spec) == null ? void 0 : _a.template) == null ? void 0 : _b.spec,
    metrics: {
      cpu: [],
      memory: [],
      gcPause: [],
      gcOverhead: []
    },
    status: deployment == null ? void 0 : deployment.status
  };
}
class Version {
  constructor(version, major, minor, patch) {
    __publicField(this, "version");
    __publicField(this, "major");
    __publicField(this, "minor");
    __publicField(this, "patch");
    this.version = version;
    this.major = major;
    this.minor = minor;
    this.patch = patch;
  }
  // Static method to parse a version string
  static parseVersion(version) {
    const versionParts = version ? version.replace(/[^0-9.]/g, "").split(".") : [];
    let major = 0;
    let minor = 0;
    let patch = 0;
    if (versionParts.length >= 3) {
      major = parseInt(versionParts[0], 10);
      minor = parseInt(versionParts[1], 10);
      patch = parseInt(versionParts[2], 10);
    } else if (versionParts.length === 2) {
      major = parseInt(versionParts[0], 10);
      minor = parseInt(versionParts[1], 10);
    } else if (versionParts.length === 1) {
      major = parseInt(versionParts[0], 10);
    } else {
      return null;
    }
    return new Version(version, major, minor, patch);
  }
}

const Status = ({ title, status }) => {
  const renderIcon = () => {
    switch (status) {
      case "Succeeded":
        return /* @__PURE__ */ React__default.createElement(CheckCircle, { style: { color: "green" } });
      case "Failed":
        return /* @__PURE__ */ React__default.createElement(HighlightOff, { style: { color: "red" } });
      case "Pending":
        return /* @__PURE__ */ React__default.createElement(AccessTime, { style: { color: "gray" } });
      default:
        return null;
    }
  };
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, title, renderIcon());
};

const QuarkusApplicationDetailsCard = ({ application }) => {
  const [name, setName] = useState();
  const [namespace, setNamespace] = useState();
  const [kind, setKind] = useState();
  const [version, setVersion] = useState();
  const [buildTimestamp, setBuildTimestamp] = useState();
  const [vcsUri, setVcsUri] = useState();
  const [location, setLocation] = useState();
  const [healthEndpoint, setHealthEndpoint] = useState();
  const [healthEndpointStatus, setHealthEndpointStatus] = useState("Pending");
  const [metricsEndpoint, setMetricsEndpoint] = useState();
  const [metricsEndpointStatus, setMetricsEndpointStatus] = useState("Pending");
  const [infoEndpoint, setInfoEndpoint] = useState();
  const [infoEndpointStatus, setInfoEndpointStatus] = useState("Pending");
  const [produiEndpoint, setProduiEndpoint] = useState();
  const [produiEndpointStatus, setProduiEndpointStatus] = useState("Pending");
  const [framework, setFramework] = useState();
  const [frameworkUrl, setFrameworkUrl] = useState();
  const [frameworkVersion, setFrameworkVersion] = useState();
  const [releaseNotesUrl, setReleaseNotesUrl] = useState();
  useEffect(() => {
    if (application && application.metadata) {
      const quarkusVersion = getQuarkusVersion(application);
      setKind(application.kind);
      setName(application.metadata.name);
      setNamespace(application.metadata.namespace);
      setVersion(getApplicationVersion(application));
      setBuildTimestamp(getBuildTimestamp(application));
      setVcsUri(getVcsUri(application));
      setLocation(application.url);
      setHealthEndpoint(getHealthCheckEndpoint(application));
      setHealthEndpointStatus(getHealthStatus(application));
      setMetricsEndpoint("/q/metrics");
      checkMetricsEndpointStatus(application);
      setInfoEndpoint("/q/info");
      checkInfoEndpointStatus(application);
      setProduiEndpoint("/q/dev");
      checkProduiEndpointStatus(application);
      setFramework("quarkus");
      setFrameworkVersion(quarkusVersion);
    }
  }, [application]);
  useEffect(() => {
    switch (framework) {
      case "quarkus":
        setFrameworkUrl("https://quarkus.io/");
        break;
      default:
        setFrameworkUrl("");
        break;
    }
  }, [framework]);
  useEffect(() => {
    if (frameworkVersion && frameworkVersion.version) {
      const releaseUrl = `https://github.com/quarkusio/quarkus/releases/tag/${frameworkVersion.version}`;
      if (!frameworkVersion.version.endsWith("-SNAPSHOT")) {
        setReleaseNotesUrl(releaseUrl);
      }
    }
  }, [frameworkVersion]);
  function getHealthCheckEndpoint(application2) {
    var _a, _b;
    if (application2 && application2.spec && application2.spec.containers) {
      for (const container of application2.spec.containers) {
        if ((_b = (_a = container.readinessProbe) == null ? void 0 : _a.httpGet) == null ? void 0 : _b.path) {
          return container.readinessProbe.httpGet.path;
        }
      }
    }
    return "";
  }
  function getVcsUri(application2) {
    if (application2 && application2.metadata && application2.metadata.annotations) {
      return application2.metadata.annotations["app.openshift.io/vcs-uri"];
    }
    return null;
  }
  function convertGitUrlToHttp(gitUrl) {
    const githubSshRegex = /^(git@github\.com:)([^#]+)/;
    const gitlabSshRegex = /^(git@gitlab\.com:)([^#]+)/;
    if (githubSshRegex.test(gitUrl)) {
      return gitUrl.replace(githubSshRegex, "https://github.com/$2");
    }
    if (gitlabSshRegex.test(gitUrl)) {
      return gitUrl.replace(gitlabSshRegex, "https://gitlab.com/$2");
    }
    return gitUrl;
  }
  function getBuildTimestamp(application2) {
    if (application2 && application2.metadata && application2.metadata.annotations) {
      return application2.metadata.annotations["app.quarkus.io/build-timestamp"];
    }
    return null;
  }
  function getApplicationVersion(application2) {
    if (application2 && application2.metadata && application2.metadata.annotations) {
      return application2.metadata.annotations["app.kubernetes.io/version"];
    }
    return null;
  }
  function getQuarkusVersion(application2) {
    if (application2 && application2.metadata && application2.metadata.annotations) {
      return Version.parseVersion(application2.metadata.annotations["app.quarkus.io/quarkus-version"]);
    }
    return null;
  }
  function getHealthStatus(application2) {
    return application2.status && application2.status.replicas === application2.status.availableReplicas ? "Succeeded" : "Failed";
  }
  function checkMetricsEndpointStatus(application2) {
    if (application2) {
      setMetricsEndpointStatus("Succeeded");
    } else {
      setMetricsEndpointStatus("Failed");
    }
  }
  function checkInfoEndpointStatus(application2) {
    if (application2) {
      setInfoEndpointStatus("Succeeded");
    } else {
      setInfoEndpointStatus("Failed");
    }
  }
  function checkProduiEndpointStatus(application2) {
    if (application2) {
      setProduiEndpointStatus("Succeeded");
    } else {
      setProduiEndpointStatus("Failed");
    }
  }
  return /* @__PURE__ */ React__default.createElement(Card, null, /* @__PURE__ */ React__default.createElement(CardHeader, { title: "Application" }), /* @__PURE__ */ React__default.createElement(CardContent, null, application ? /* @__PURE__ */ React__default.createElement(Box, null, /* @__PURE__ */ React__default.createElement(Card, null, /* @__PURE__ */ React__default.createElement(CardHeader, { title: "Details" }), /* @__PURE__ */ React__default.createElement(CardContent, null, /* @__PURE__ */ React__default.createElement(Typography, { variant: "body1" }, /* @__PURE__ */ React__default.createElement("strong", null, "Kind:"), " ", kind), /* @__PURE__ */ React__default.createElement(Typography, { variant: "body1" }, /* @__PURE__ */ React__default.createElement("strong", null, "Name:"), " ", name), /* @__PURE__ */ React__default.createElement(Typography, { variant: "body1" }, /* @__PURE__ */ React__default.createElement("strong", null, "Namespace:"), " ", namespace), /* @__PURE__ */ React__default.createElement(Typography, { variant: "body1" }, /* @__PURE__ */ React__default.createElement("strong", null, "Version:"), " ", version), /* @__PURE__ */ React__default.createElement(Typography, { variant: "body1" }, /* @__PURE__ */ React__default.createElement("strong", null, "Build Timestamp:"), " ", buildTimestamp), vcsUri && /* @__PURE__ */ React__default.createElement(Typography, { variant: "body1" }, /* @__PURE__ */ React__default.createElement("strong", null, "Version Control:"), /* @__PURE__ */ React__default.createElement("a", { href: convertGitUrlToHttp(vcsUri), target: "_blank", rel: "noopener noreferrer" }, vcsUri)), /* @__PURE__ */ React__default.createElement(Typography, { variant: "body1" }, /* @__PURE__ */ React__default.createElement("strong", null, "Location:"), /* @__PURE__ */ React__default.createElement("a", { href: location, target: "_blank", rel: "noopener noreferrer" }, location)))), /* @__PURE__ */ React__default.createElement(Card, null, /* @__PURE__ */ React__default.createElement(CardHeader, { title: "Endpoints" }), /* @__PURE__ */ React__default.createElement(CardContent, null, /* @__PURE__ */ React__default.createElement(Typography, { variant: "body1" }, /* @__PURE__ */ React__default.createElement("strong", null, "Health Endpoint:"), " ", /* @__PURE__ */ React__default.createElement(Status, { title: healthEndpoint, status: healthEndpointStatus })), /* @__PURE__ */ React__default.createElement(Typography, { variant: "body1" }, /* @__PURE__ */ React__default.createElement("strong", null, "Metrics Endpoint:"), " ", /* @__PURE__ */ React__default.createElement(Status, { title: metricsEndpoint, status: metricsEndpointStatus })), /* @__PURE__ */ React__default.createElement(Typography, { variant: "body1" }, /* @__PURE__ */ React__default.createElement("strong", null, "Info Endpoint:"), " ", /* @__PURE__ */ React__default.createElement(Status, { title: infoEndpoint, status: infoEndpointStatus })), /* @__PURE__ */ React__default.createElement(Typography, { variant: "body1" }, /* @__PURE__ */ React__default.createElement("strong", null, "Prod UI Endpoint:"), " ", /* @__PURE__ */ React__default.createElement(Status, { title: produiEndpoint, status: produiEndpointStatus })))), /* @__PURE__ */ React__default.createElement(Card, null, /* @__PURE__ */ React__default.createElement(CardHeader, { title: "Framework" }), /* @__PURE__ */ React__default.createElement(CardContent, null, /* @__PURE__ */ React__default.createElement(Typography, { variant: "body1" }, /* @__PURE__ */ React__default.createElement("strong", null, "Framework:"), frameworkUrl ? /* @__PURE__ */ React__default.createElement("a", { href: frameworkUrl, target: "_blank", rel: "noopener noreferrer" }, framework) : framework), frameworkVersion && /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Typography, { variant: "body1" }, /* @__PURE__ */ React__default.createElement("strong", null, "Version:"), releaseNotesUrl ? /* @__PURE__ */ React__default.createElement("a", { href: releaseNotesUrl, target: "_blank", rel: "noopener noreferrer" }, frameworkVersion.version) : frameworkVersion.version), /* @__PURE__ */ React__default.createElement(Typography, { variant: "body1" }, /* @__PURE__ */ React__default.createElement("strong", null, "Major Version:"), " ", frameworkVersion.major), /* @__PURE__ */ React__default.createElement(Typography, { variant: "body1" }, /* @__PURE__ */ React__default.createElement("strong", null, "Minor Version:"), " ", frameworkVersion.minor), /* @__PURE__ */ React__default.createElement(Typography, { variant: "body1" }, /* @__PURE__ */ React__default.createElement("strong", null, "Patch Version:"), " ", frameworkVersion.patch))))) : /* @__PURE__ */ React__default.createElement(CircularProgress, null)));
};

const QuarkusIcon = (props) => /* @__PURE__ */ React__default.createElement(SvgIcon, { ...props, viewBox: "0 0 32 32" }, /* @__PURE__ */ React__default.createElement(
  "path",
  {
    fill: "currentColor",
    width: "1em",
    height: "1em",
    display: "inline-block",
    d: "M17.052 21.287l5.161-2.984v-5.959l-5.161 2.979zM17.541 21.568l4.672 2.697v-5.391l-4.672 2.699zM21.932 11.287v-5.391l-4.672 2.692 4.672 2.693zM16.771 8.875l-5.167 2.98 5.167 2.984 5.161-2.984zM16.276 8.588l-4.672-2.692v5.391zM22.708 12.631v5.385l4.667-2.693-4.667-2.697zM16.489 21.287v-5.964l-5.167-2.979v5.959zM10.828 12.625l-4.667 2.697 4.667 2.693zM11.323 18.875v5.391l4.672-2.697zM26.677 0.177h-21.371c-2.921 0-5.307 2.359-5.307 5.239v21.111c0 2.885 2.385 5.239 5.307 5.239h14.631l-3.948-9.473-2.864 5.984h-7.819c-0.957 0-1.771-0.803-1.771-1.749v-21.111c0-0.943 0.813-1.744 1.771-1.744h21.371c0.959 0 1.771 0.801 1.771 1.744v21.111c0 0.947-0.812 1.749-1.771 1.749h-4.636l1.453 3.489h3.183c2.916 0 5.307-2.353 5.307-5.239v-21.111c0-2.88-2.391-5.239-5.307-5.239z"
  }
));

export { QuarkusApplicationDetailsCard as Q, Status as S, QuarkusConsolePlugin as a, QuarkusConsolePage as b, QuarkusIcon as c, deploymentToApplication as d };
//# sourceMappingURL=index-748b67c3.esm.js.map
