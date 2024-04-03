import * as React from 'react';
import React__default, { useState, useEffect } from 'react';
import { Card as Card$1, CardContent as CardContent$1, Typography as Typography$1, List as List$1, ListItem as ListItem$1, Tooltip, Tabs, Tab } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { S as Status, d as deploymentToApplication, Q as QuarkusApplicationDetailsCard } from './index-748b67c3.esm.js';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useEntity } from '@backstage/plugin-catalog-react';
import { useKubernetesObjects } from '@backstage/plugin-kubernetes';
import { Card as Card$2, CardContent as CardContent$2, Typography as Typography$2 } from '@material-ui/core';
import '@backstage/core-plugin-api';
import '@material-ui/icons/CheckCircle';
import '@material-ui/icons/AccessTime';
import '@material-ui/icons/HighlightOff';

const ReplicaSetGVK = {
  apiVersion: "v1",
  apiGroup: "apps",
  kind: "ReplicaSet"
};
const PodGVK = {
  apiVersion: "v1",
  kind: "Pod"
};
const DeploymentGVK = {
  apiVersion: "v1",
  apiGroup: "apps",
  kind: "Deployment"
};
const ServiceGVK = {
  apiVersion: "v1",
  kind: "Service"
};
const IngressesGVK = {
  apiVersion: "networking.k8s.io/v1",
  kind: "Ingress"
};
const DaemonSetGVK = {
  apiVersion: "v1",
  apiGroup: "apps",
  kind: "DaemonSet"
};
const StatefulSetGVK = {
  apiVersion: "v1",
  apiGroup: "apps",
  kind: "StatefulSet"
};
const JobGVK = {
  apiVersion: "v1",
  apiGroup: "batch",
  kind: "Job"
};
const CronJobGVK = {
  apiVersion: "v1",
  apiGroup: "batch",
  kind: "CronJob"
};
const RouteGVK = {
  apiVersion: "v1",
  apiGroup: "route.openshift.io",
  kind: "Route"
};
const CheClusterGVK = {
  apiVersion: "v2",
  apiGroup: "org.eclipse.che",
  kind: "CheCluster"
};
const SecretGVK = {
  apiVersion: "v1",
  kind: "Secret"
};
const ConfigMapGVK = {
  apiVersion: "v1",
  kind: "ConfigMap"
};
const PersistentVolumeClaimGVK = {
  apiVersion: "v1",
  kind: "PersistentVolumeClaim"
};
var ModelsPlural = /* @__PURE__ */ ((ModelsPlural2) => {
  ModelsPlural2["pods"] = "pods";
  ModelsPlural2["deployments"] = "deployments";
  ModelsPlural2["replicasets"] = "replicasets";
  ModelsPlural2["services"] = "services";
  ModelsPlural2["ingresses"] = "ingresses";
  ModelsPlural2["jobs"] = "jobs";
  ModelsPlural2["daemonsets"] = "daemonsets";
  ModelsPlural2["cronjobs"] = "cronjobs";
  ModelsPlural2["statefulsets"] = "statefulsets";
  ModelsPlural2["routes"] = "routes";
  ModelsPlural2["configmaps"] = "configmaps";
  ModelsPlural2["secrets"] = "secrets";
  ModelsPlural2["persistentvolumeclaims"] = "persistentvolumeclaims";
  return ModelsPlural2;
})(ModelsPlural || {});
const resourceGVKs = {
  ["deployments" /* deployments */]: DeploymentGVK,
  ["pods" /* pods */]: PodGVK,
  ["replicasets" /* replicasets */]: ReplicaSetGVK,
  ["services" /* services */]: ServiceGVK,
  ["ingresses" /* ingresses */]: IngressesGVK,
  ["daemonsets" /* daemonsets */]: DaemonSetGVK,
  ["cronjobs" /* cronjobs */]: CronJobGVK,
  ["jobs" /* jobs */]: JobGVK,
  ["statefulsets" /* statefulsets */]: StatefulSetGVK,
  ["routes" /* routes */]: RouteGVK,
  ["configmaps" /* configmaps */]: ConfigMapGVK,
  ["secrets" /* secrets */]: SecretGVK,
  ["persistentvolumeclaims" /* persistentvolumeclaims */]: PersistentVolumeClaimGVK
};
const DeploymentModel = {
  ...DeploymentGVK,
  abbr: "D",
  labelPlural: "Deployments",
  color: "#004080"
};
const PodModel = {
  ...PodGVK,
  abbr: "P",
  labelPlural: "Pods",
  color: "#009596"
};
const ServiceModel = {
  ...ServiceGVK,
  abbr: "S",
  labelPlural: "Services",
  color: "#6ca100"
};
const IngressModel = {
  ...IngressesGVK,
  labelPlural: "Ingresses",
  abbr: "I"
};
const DaemonSetModel = {
  ...DaemonSetGVK,
  abbr: "DS",
  labelPlural: "DaemonSets",
  color: "#004080"
};
const StatefulSetModel = {
  ...StatefulSetGVK,
  abbr: "SS",
  labelPlural: "StatefulSets"
};
const CronJobModel = {
  ...CronJobGVK,
  abbr: "CJ",
  labelPlural: "CronJobs"
};
const JobModel = {
  ...JobGVK,
  abbr: "J",
  labelPlural: "Jobs",
  color: "#004080"
};
const RouteModel = {
  ...RouteGVK,
  abbr: "RT",
  labelPlural: "Routes",
  plural: "routes",
  color: "#2b9af3"
};
const CheClusterModel = {
  ...CheClusterGVK,
  abbr: "CC",
  labelPlural: "CheClusters",
  plural: "checlusters"
};
const ConfigMapModel = {
  ...ConfigMapGVK,
  abbr: "CM",
  labelPlural: "ConfigMaps",
  color: "#004080"
};
const SecretModel = {
  ...SecretGVK,
  abbr: "SC",
  labelPlural: "Secrets",
  color: "#004080"
};
const PersistentVolumeClaimModel = {
  ...PersistentVolumeClaimGVK,
  abbr: "PVC",
  labelPlural: "PersistentVolumeClaims",
  color: "#004080"
};
const resourceModels = {
  [DeploymentModel.kind]: DeploymentModel,
  [PodModel.kind]: PodModel,
  [ServiceModel.kind]: ServiceModel,
  [IngressModel.kind]: IngressModel,
  [StatefulSetModel.kind]: StatefulSetModel,
  [DaemonSetModel.kind]: DaemonSetModel,
  [CronJobModel.kind]: CronJobModel,
  [JobModel.kind]: JobModel,
  [RouteModel.kind]: RouteModel,
  [CheClusterModel.kind]: CheClusterModel,
  [ConfigMapModel.kind]: ConfigMapModel,
  [SecretModel.kind]: SecretModel,
  [PersistentVolumeClaimModel.kind]: PersistentVolumeClaimModel
};

[
  ModelsPlural.deployments,
  ModelsPlural.pods,
  ModelsPlural.cronjobs,
  ModelsPlural.jobs,
  ModelsPlural.statefulsets,
  ModelsPlural.daemonsets
];
const apiVersionForWorkloadType = (type) => {
  var _a, _b;
  return ((_a = resourceGVKs[type]) == null ? void 0 : _a.apiGroup) ? `${resourceGVKs[type].apiGroup}/${resourceGVKs[type].apiVersion}` : (_b = resourceGVKs[type]) == null ? void 0 : _b.apiVersion;
};
const workloadKind = (type) => {
  return resourceGVKs[type].kind;
};
const getClusters = (k8sObjects) => {
  const clusters = k8sObjects.items.map(
    (item) => item.cluster.name
  );
  const errors = k8sObjects.items.map(
    (item) => item.errors
  );
  return { clusters, errors };
};
const getCustomResourceKind = (resource) => {
  if (resource.kind) {
    return resource.kind;
  }
  if (resource.spec.host && resource.status.ingress) {
    return "Route";
  }
  return "";
};
const getK8sResources = (cluster, k8sObjects) => {
  var _a, _b, _c;
  return (_c = (_b = (_a = k8sObjects.items) == null ? void 0 : _a[cluster]) == null ? void 0 : _b.resources) == null ? void 0 : _c.reduce(
    (acc, res) => {
      var _a2;
      if (res.type === "customresources" && res.resources.length > 0) {
        const customResKind = getCustomResourceKind(res.resources[0]);
        const customResKnownModel = resourceModels[customResKind];
        return (customResKnownModel == null ? void 0 : customResKnownModel.plural) ? {
          ...acc,
          [customResKnownModel.plural]: {
            data: res.resources.map((rval) => ({
              ...rval,
              kind: customResKind,
              apiVersion: apiVersionForWorkloadType(customResKind)
            }))
          }
        } : acc;
      }
      return {
        ...acc,
        [res.type]: {
          data: (_a2 = resourceGVKs[res.type] && res.resources.map((rval) => ({
            ...rval,
            kind: workloadKind(res.type),
            apiVersion: apiVersionForWorkloadType(res.type)
          }))) != null ? _a2 : []
        }
      };
    },
    {}
  );
};

const useAllWatchResources = (watchedResource = [], k8sObjectsResponse, cluster) => {
  const { kubernetesObjects, loading, error } = k8sObjectsResponse;
  const [resources, setResources] = useState({});
  useEffect(() => {
    if (!loading && kubernetesObjects && !error) {
      const k8sResources = getK8sResources(
        cluster,
        kubernetesObjects
      );
      if (k8sResources) {
        setResources(k8sResources);
      }
    }
  }, [loading, kubernetesObjects, error, cluster]);
  const watchResourcesData = watchedResource.reduce(
    (acc, resKind) => {
      if (resources[resKind]) {
        acc[resKind] = resources[resKind];
      }
      return acc;
    },
    {}
  );
  return watchResourcesData;
};

const useK8sResourcesClusters = (k8sObjectsResponse) => {
  const { kubernetesObjects, loading, error } = k8sObjectsResponse;
  const [clusters, setClusters] = useState({ clusters: [], errors: [] });
  useEffect(() => {
    if (!loading && kubernetesObjects && !error) {
      const k8sResourcesClusters = getClusters(kubernetesObjects);
      if (k8sResourcesClusters) {
        setClusters(k8sResourcesClusters);
      }
    }
  }, [loading, kubernetesObjects, error]);
  return clusters;
};

const useK8sObjectsResponse = (watchedResource) => {
  var _a;
  const { entity } = useEntity();
  const { kubernetesObjects, loading, error } = useKubernetesObjects(entity);
  const [selectedCluster, setSelectedCluster] = useState(0);
  const watchResourcesData = useAllWatchResources(
    watchedResource,
    { kubernetesObjects, loading, error },
    selectedCluster
  );
  const { clusters, errors: clusterErrors } = useK8sResourcesClusters({
    kubernetesObjects,
    loading,
    error
  });
  return {
    watchResourcesData,
    loading,
    responseError: error,
    selectedClusterErrors: (_a = clusterErrors == null ? void 0 : clusterErrors[selectedCluster]) != null ? _a : [],
    clusters,
    setSelectedCluster,
    selectedCluster
  };
};
const usePods = () => {
  var _a, _b;
  const { watchResourcesData } = useK8sObjectsResponse([ModelsPlural.pods]);
  return (_b = (_a = watchResourcesData == null ? void 0 : watchResourcesData.pods) == null ? void 0 : _a.data) != null ? _b : [];
};
const useJobs = () => {
  var _a, _b;
  const { watchResourcesData } = useK8sObjectsResponse([ModelsPlural.jobs]);
  return (_b = (_a = watchResourcesData == null ? void 0 : watchResourcesData.jobs) == null ? void 0 : _a.data) != null ? _b : [];
};
const useAllSecrets = () => {
  var _a, _b;
  const { watchResourcesData } = useK8sObjectsResponse([ModelsPlural.secrets]);
  return (_b = (_a = watchResourcesData == null ? void 0 : watchResourcesData.secrets) == null ? void 0 : _a.data) != null ? _b : [];
};
const useSecret = (namespace, name) => {
  return useAllSecrets().filter((item) => item && item.metadata && item.metadata.namespace === namespace && item.metadata.name === name)[0];
};
const useAllConfigMaps = () => {
  var _a, _b;
  const { watchResourcesData } = useK8sObjectsResponse([ModelsPlural.configmaps]);
  return (_b = (_a = watchResourcesData == null ? void 0 : watchResourcesData.configmaps) == null ? void 0 : _a.data) != null ? _b : [];
};
const useConfigMap = (namespace, name) => {
  return useAllConfigMaps().filter((item) => item && item.metadata && item.metadata.namespace === namespace && item.metadata.name === name)[0];
};
const useAllPersistentVolumeClaims = () => {
  var _a, _b;
  const { watchResourcesData } = useK8sObjectsResponse([ModelsPlural.persistentvolumeclaims]);
  return (_b = (_a = watchResourcesData == null ? void 0 : watchResourcesData.persistentvolumeclaims) == null ? void 0 : _a.data) != null ? _b : [];
};
const usePersistentVolumeClaim = (namespace, name) => {
  return useAllPersistentVolumeClaims().filter((item) => item && item.metadata && item.metadata.namespace === namespace && item.metadata.name === name)[0];
};

const ApplicationVolumeHealthCard = ({ application }) => {
  var _a, _b, _c;
  const [volumes, setVolumes] = useState((_b = (_a = application == null ? void 0 : application.spec) == null ? void 0 : _a.volumes) != null ? _b : []);
  const [volumeStatus, setVolumeStatus] = useState({});
  useEffect(() => {
    var _a2, _b2;
    setVolumes((_b2 = (_a2 = application == null ? void 0 : application.spec) == null ? void 0 : _a2.volumes) != null ? _b2 : []);
  }, [application]);
  useEffect(() => {
    if (application && application.metadata) {
      volumes.forEach((volume) => {
        var _a2, _b2, _c2;
        const kind = volumeKind(volume);
        switch (kind) {
          case "ConfigMap":
            const configMap = useConfigMap((_a2 = application.metadata) == null ? void 0 : _a2.namespace, volume.name);
            updateVolumeStatus(volume.name, configMap ? "Succeeded" : "Pending");
            break;
          case "Secret":
            const secret = useSecret((_b2 = application.metadata) == null ? void 0 : _b2.namespace, volume.name);
            updateVolumeStatus(volume.name, secret ? "Succeeded" : "Pending");
            break;
          case "PersistentVolumeClaim":
            const pvc = usePersistentVolumeClaim((_c2 = application.metadata) == null ? void 0 : _c2.namespace, volume.name);
            updateVolumeStatus(volume.name, pvc ? "Succeeded" : "Pending");
            break;
          default:
            console.log("Unknown volume kind: " + kind);
        }
      });
    }
  }, [volumes, (_c = application.metadata) == null ? void 0 : _c.namespace]);
  const updateVolumeStatus = (name, status) => {
    setVolumeStatus((prevStatus) => ({
      ...prevStatus,
      [name]: status
    }));
  };
  const volumeKind = (volume) => {
    if (volume.configMap) {
      return "ConfigMap";
    }
    if (volume.secret) {
      return "Secret";
    }
    if (volume.emptyDir) {
      return "EmptyDir";
    }
    if (volume.persistentVolumeClaim) {
      return "PersistentVolumeClaim";
    }
    if (volume.hostPath) {
      return "HostPath";
    }
    if (volume.awsElasticBlockStore) {
      return "AWS Elastic Block Store";
    }
    if (volume.azureDisk) {
      return "Azure Disk";
    }
    if (volume.azureFile) {
      return "Azure File";
    }
    if (volume.cinder) {
      return "Cinder";
    }
    if (volume.downwardAPI) {
      return "Downward API";
    }
    if (volume.fc) {
      return "FC";
    }
    if (volume.flexVolume) {
      return "Flex Volume";
    }
    return "Unknown";
  };
  const containerHasVolume = (container, volumeName) => {
    var _a2;
    return (_a2 = container.volumeMounts) == null ? void 0 : _a2.filter((volumeMount) => volumeMount.name = volumeName);
  };
  return /* @__PURE__ */ React__default.createElement(Card, null, /* @__PURE__ */ React__default.createElement(CardContent, null, /* @__PURE__ */ React__default.createElement(Typography, { variant: "h5", gutterBottom: true }, "Volumes"), /* @__PURE__ */ React__default.createElement(List, null, application && application.spec && application.spec.volumes && application.spec.volumes.map((volume) => {
    var _a2, _b2, _c2, _d, _e;
    return /* @__PURE__ */ React__default.createElement(ListItem, { key: volume.name }, volume.name, /* @__PURE__ */ React__default.createElement(ListItemText, { primary: `Kind: ${volumeKind(volume)}` }), /* @__PURE__ */ React__default.createElement("ul", null, (_b2 = (_a2 = application.spec) == null ? void 0 : _a2.containers) == null ? void 0 : _b2.filter((container) => containerHasVolume(container, volume.name)).map((container) => {
      var _a3;
      return /* @__PURE__ */ React__default.createElement("li", { key: container.name }, "Container: ", container.name, (_a3 = container.volumeMounts) == null ? void 0 : _a3.filter((volumeMount) => volumeMount.name === volume.name).map((volumeMount) => /* @__PURE__ */ React__default.createElement(ListItemText, { key: volumeMount.mountPath, primary: `Path: ${volumeMount.mountPath}` })));
    })), /* @__PURE__ */ React__default.createElement(ListItemText, { primary: `Status:`, secondary: (_c2 = volumeStatus[volume.name]) != null ? _c2 : "Pending" }), /* @__PURE__ */ React__default.createElement(
      Status,
      {
        title: (_d = volumeStatus[volume.name]) != null ? _d : "Pending",
        status: (_e = volumeStatus[volume.name]) != null ? _e : "Pending"
      }
    ));
  }))));
};

const ApplicationJobHealthCard = ({ application }) => {
  const allJobs = useJobs();
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    var _a;
    const newJobs = [];
    const name = (_a = application == null ? void 0 : application.metadata) == null ? void 0 : _a.name;
    if (name) {
      allJobs.filter((job) => {
        var _a2, _b, _c;
        return ((_b = (_a2 = job.metadata) == null ? void 0 : _a2.name) == null ? void 0 : _b.startsWith(name)) && ((_c = job.metadata) == null ? void 0 : _c.name.endsWith("-init"));
      }).forEach((job) => {
        newJobs.push(job);
      });
      setJobs(newJobs);
    }
  }, [application]);
  const trimImage = (image) => {
    if (!image) {
      return image;
    }
    if (image.includes("@sha256")) {
      const parts = image.split("@sha256:");
      return parts[0] + "@sha256:" + parts[1].substring(0, 7);
    }
    return image;
  };
  const jobStatus = (job) => {
    var _a, _b, _c;
    if ((_a = job.status) == null ? void 0 : _a.succeeded) {
      return "Succeeded";
    }
    if ((_b = job.status) == null ? void 0 : _b.failed) {
      return "Failed";
    }
    if ((_c = job.status) == null ? void 0 : _c.active) {
      return "Running";
    }
    return "Unknown";
  };
  return /* @__PURE__ */ React__default.createElement(Card$1, null, /* @__PURE__ */ React__default.createElement(CardContent$1, null, /* @__PURE__ */ React__default.createElement(Typography$1, { variant: "h5", component: "div" }, "Jobs"), /* @__PURE__ */ React__default.createElement(List$1, null, jobs && jobs.map((job, index) => {
    var _a, _b, _c, _d;
    return /* @__PURE__ */ React__default.createElement(ListItem$1, { key: index }, (_a = job.metadata) == null ? void 0 : _a.name, (_d = (_c = (_b = job.spec) == null ? void 0 : _b.template) == null ? void 0 : _c.spec) == null ? void 0 : _d.containers.map((container, idx) => /* @__PURE__ */ React__default.createElement("div", { key: idx }, /* @__PURE__ */ React__default.createElement(Typography$1, null, /* @__PURE__ */ React__default.createElement("strong", null, "Name:"), " ", container.name), /* @__PURE__ */ React__default.createElement(Typography$1, null, /* @__PURE__ */ React__default.createElement("strong", null, "Image:"), " ", trimImage(container.image)), /* @__PURE__ */ React__default.createElement(Typography$1, null, /* @__PURE__ */ React__default.createElement("strong", null, "Command:"), " ", container.command), /* @__PURE__ */ React__default.createElement(Typography$1, null, /* @__PURE__ */ React__default.createElement("strong", null, "Args:"), " ", container.args))), /* @__PURE__ */ React__default.createElement(Typography$1, null, "Status:", " ", /* @__PURE__ */ React__default.createElement(Status, { title: jobStatus(job), status: jobStatus(job) })));
  }))));
};

const ApplicationInitContainerHealthCard = ({ application }) => {
  const allPods = usePods();
  const [pods, setPods] = useState([]);
  useEffect(() => {
    if (application && application.metadata) {
      setPods(allPods.filter((pod) => {
        var _a, _b, _c;
        return ((_b = (_a = pod.metadata) == null ? void 0 : _a.labels) == null ? void 0 : _b["app.kubernetes.io/name"]) === ((_c = application.metadata) == null ? void 0 : _c.name);
      }));
    }
  }, [application]);
  const trimImage = (image) => {
    if (!image) {
      return image;
    }
    if (image.includes("@sha256")) {
      const parts = image.split("@sha256:");
      return parts[0] + "@sha256:" + parts[1].substring(0, 7);
    }
    return image;
  };
  const initContainerStatus = (pods2, initContainerName) => {
    const states = pods2.flatMap((p) => {
      var _a, _b;
      return (_b = (_a = p.status) == null ? void 0 : _a.initContainerStatuses) == null ? void 0 : _b.filter((s) => s.name === initContainerName).map((s) => s.state);
    });
    if (states.some((s) => s == null ? void 0 : s.running)) {
      return "Pending";
    }
    if (states.every((s) => {
      var _a;
      return ((_a = s == null ? void 0 : s.terminated) == null ? void 0 : _a.reason) === "Completed";
    })) {
      return "Succeeded";
    }
    if (states.some((s) => {
      var _a;
      return ((_a = s == null ? void 0 : s.terminated) == null ? void 0 : _a.reason) === "Failed";
    })) {
      return "Failed";
    }
    return "Unknown";
  };
  return /* @__PURE__ */ React__default.createElement(Card$1, null, /* @__PURE__ */ React__default.createElement(CardContent$1, null, /* @__PURE__ */ React__default.createElement(Typography$1, { variant: "h5", component: "div" }, "Init Containers"), /* @__PURE__ */ React__default.createElement(List$1, null, application && application.spec && application.spec.initContainers && application.spec.initContainers.map((container, index) => /* @__PURE__ */ React__default.createElement(ListItem$1, { key: index }, /* @__PURE__ */ React__default.createElement(Typography$1, { variant: "h6" }, container.name), /* @__PURE__ */ React__default.createElement("div", null, /* @__PURE__ */ React__default.createElement(Typography$1, null, /* @__PURE__ */ React__default.createElement("strong", null, "Name:"), " ", container.name), /* @__PURE__ */ React__default.createElement(Typography$1, null, /* @__PURE__ */ React__default.createElement("strong", null, "Image:"), " ", trimImage(container.image)), /* @__PURE__ */ React__default.createElement(Typography$1, null, /* @__PURE__ */ React__default.createElement("strong", null, "Command:"), " ", container.command), /* @__PURE__ */ React__default.createElement(Typography$1, null, /* @__PURE__ */ React__default.createElement("strong", null, "Args:"), " ", container.args)), /* @__PURE__ */ React__default.createElement(Typography$1, null, "Status:", " ", /* @__PURE__ */ React__default.createElement(Status, { title: initContainerStatus(pods, container.name), status: initContainerStatus(pods, container.name) })))))));
};

const ApplicationProbeHealthCard = ({ application }) => {
  var _a, _b, _c, _d, _e, _f;
  const [probes, setProbes] = useState({
    readinessProbe: null,
    livenessProbe: null,
    startupProbe: null
  });
  useEffect(() => {
    var _a2, _b2, _c2;
    if (application && application.spec && application.spec.containers && application.spec.containers.length > 0) {
      const container = application.spec.containers[0];
      setProbes({
        readinessProbe: container.readinessProbe ? ((_a2 = container.readinessProbe.httpGet) == null ? void 0 : _a2.path) || null : null,
        livenessProbe: container.livenessProbe ? ((_b2 = container.livenessProbe.httpGet) == null ? void 0 : _b2.path) || null : null,
        startupProbe: container.startupProbe ? ((_c2 = container.startupProbe.httpGet) == null ? void 0 : _c2.path) || null : null
      });
    }
  }, [application]);
  return /* @__PURE__ */ React__default.createElement(Card$1, null, /* @__PURE__ */ React__default.createElement(CardContent$1, null, /* @__PURE__ */ React__default.createElement(Typography$1, { variant: "h5", component: "div" }, "Probes"), /* @__PURE__ */ React__default.createElement(Typography$1, { component: "div" }, /* @__PURE__ */ React__default.createElement("p", null, /* @__PURE__ */ React__default.createElement("strong", null, "Startup Probe:"), " ", /* @__PURE__ */ React__default.createElement(Status, { title: probes.startupProbe || "N/A", status: probes.startupProbe && ((_a = application.status) == null ? void 0 : _a.availableReplicas) === ((_b = application.status) == null ? void 0 : _b.replicas) ? "Succeeded" : "Failed" })), /* @__PURE__ */ React__default.createElement("p", null, /* @__PURE__ */ React__default.createElement("strong", null, "Readiness Probe:"), " ", /* @__PURE__ */ React__default.createElement(Status, { title: probes.readinessProbe || "N/A", status: probes.readinessProbe && ((_c = application.status) == null ? void 0 : _c.availableReplicas) === ((_d = application.status) == null ? void 0 : _d.replicas) ? "Succeeded" : "Failed" })), /* @__PURE__ */ React__default.createElement("p", null, /* @__PURE__ */ React__default.createElement("strong", null, "Liveness Probe:"), " ", /* @__PURE__ */ React__default.createElement(Status, { title: probes.livenessProbe || "N/A", status: probes.livenessProbe && ((_e = application.status) == null ? void 0 : _e.availableReplicas) === ((_f = application.status) == null ? void 0 : _f.replicas) ? "Succeeded" : "Failed" })))));
};

const QuarkusApplicationHealthCard = ({ application }) => {
  return /* @__PURE__ */ React.createElement(Card$2, null, /* @__PURE__ */ React.createElement(CardContent$2, null, /* @__PURE__ */ React.createElement(Typography$2, { variant: "h5", gutterBottom: true }, "Configuration"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", height: "100%" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "row", flex: "1", height: "50%" } }, /* @__PURE__ */ React.createElement("div", { style: { flex: "1", padding: "8px" } }, /* @__PURE__ */ React.createElement(ApplicationProbeHealthCard, { application })), /* @__PURE__ */ React.createElement("div", { style: { flex: "1", padding: "8px" } }, /* @__PURE__ */ React.createElement(ApplicationVolumeHealthCard, { application }))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "row", flex: "1", height: "50%" } }, /* @__PURE__ */ React.createElement("div", { style: { flex: "1", padding: "8px", height: "100%" } }, /* @__PURE__ */ React.createElement(ApplicationInitContainerHealthCard, { application })), /* @__PURE__ */ React.createElement("div", { style: { flex: "1", padding: "8px" } }, /* @__PURE__ */ React.createElement(ApplicationJobHealthCard, { application }))))));
};

const QuarkusApplicationMetricsCard = ({ application }) => {
  useEffect(() => {
    console.log("QuarkusApplicationLoggingCard: application:", application);
  }, [application]);
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null);
};

function extractEnvironmentVariables(application) {
  var _a;
  const envVars = {};
  if (((_a = application.spec) == null ? void 0 : _a.containers) && application.spec.containers.length > 0) {
    application.spec.containers.forEach((container) => {
      if (container.env) {
        container.env.forEach((envVar) => {
          if (envVar.name && envVar.value) {
            envVars[envVar.name] = envVar.value;
          }
        });
      }
    });
  }
  return envVars;
}
function extractMountedSecrets(application) {
  var _a, _b;
  const mountedSecrets = [];
  (_b = (_a = application.spec) == null ? void 0 : _a.volumes) == null ? void 0 : _b.forEach((volume) => {
    if (volume.secret && volume.secret.secretName) {
      mountedSecrets.push(volume.secret.secretName);
    }
  });
  return mountedSecrets;
}
function extractMountedConfigMaps(application) {
  var _a, _b;
  const mountedConfigMaps = [];
  (_b = (_a = application.spec) == null ? void 0 : _a.volumes) == null ? void 0 : _b.forEach((volume) => {
    if (volume.configMap && volume.configMap.name) {
      mountedConfigMaps.push(volume.configMap.name);
    }
  });
  return mountedConfigMaps;
}

const QuarkusApplicationConfigurationCard = ({ application }) => {
  var _a;
  const [envVars, setEnvVars] = useState({});
  const [secrets, setSecrets] = useState([]);
  const [configMaps, setConfigMaps] = useState([]);
  const [descriptions, setDescriptions] = useState({});
  useEffect(() => {
    Object.entries(envVars).forEach(([key, _]) => {
      fetchQuarkusConfigInfo(envVarToProperty(key)).then((description) => {
        setDescriptions((prevDescriptions) => ({
          ...prevDescriptions,
          [key]: description
        }));
      });
    });
  }, [envVars]);
  useEffect(() => {
    if (application && application.spec) {
      setEnvVars(extractEnvironmentVariables(application));
      setSecrets(extractMountedSecrets(application));
      setConfigMaps(extractMountedConfigMaps(application));
    }
  }, [application]);
  function descriptionSafe(key) {
    return descriptions && descriptions[key] ? descriptions[key] : key;
  }
  function envVarToProperty(envVar) {
    return envVar.toLowerCase().replace(/_/g, ".");
  }
  async function fetchQuarkusConfigInfo(propertyName) {
    const response = await fetch("https://quarkus.io/guides/all-config");
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const tables = doc.querySelectorAll("table");
    let info = "";
    tables.forEach((table) => {
      table.querySelectorAll("tbody tr").forEach((row) => {
        var _a2, _b, _c, _d;
        const keyCell = row.querySelector("td:first-child");
        const descriptionCell = row.querySelector("td:nth-child(1)");
        const typeCell = row.querySelector("td:nth-child(2)");
        const defaultCell = row.querySelector("td:nth-child(3)");
        if (keyCell && descriptionCell && ((_a2 = keyCell.textContent) == null ? void 0 : _a2.includes(propertyName))) {
          info = ((_b = descriptionCell.textContent) == null ? void 0 : _b.split("\n").filter((line) => !line.startsWith(propertyName)).filter((line) => !line.startsWith("Environment Variable")).filter((line) => !line.startsWith("Show more")).join("\n")) + " \n";
          "Defaults to (" + ((_c = typeCell == null ? void 0 : typeCell.textContent) == null ? void 0 : _c.trim()) + "): " + ((_d = defaultCell == null ? void 0 : defaultCell.textContent) == null ? void 0 : _d.trim());
        }
      });
    });
    return info;
  }
  return /* @__PURE__ */ React.createElement(Card$1, null, /* @__PURE__ */ React.createElement(CardContent$1, null, /* @__PURE__ */ React.createElement(Typography$1, { variant: "h5", gutterBottom: true }, "Configuration"), application && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Typography$1, { component: "p" }, "Name: ", (_a = application.metadata) == null ? void 0 : _a.name), /* @__PURE__ */ React.createElement(Typography$1, { component: "p" }, "Environment Variables:"), /* @__PURE__ */ React.createElement("ul", null, Object.entries(envVars).map(([key, value]) => /* @__PURE__ */ React.createElement("li", { key }, /* @__PURE__ */ React.createElement(Tooltip, { title: descriptionSafe(key) }, /* @__PURE__ */ React.createElement(Typography$1, { component: "p" }, /* @__PURE__ */ React.createElement("strong", null, key, ":"), value))))), /* @__PURE__ */ React.createElement(Typography$1, { component: "p" }, "Secrets:"), /* @__PURE__ */ React.createElement("ul", null, secrets.map((secret) => /* @__PURE__ */ React.createElement("li", { key: secret }, secret))), /* @__PURE__ */ React.createElement(Typography$1, { component: "p" }, "Config Maps:"), /* @__PURE__ */ React.createElement("ul", null, configMaps.map((configMap) => /* @__PURE__ */ React.createElement("li", { key: configMap }, "configMap"))))));
};

const QuarkusApplicationLoggingCard = ({ application }) => {
  useEffect(() => {
    console.log("QuarkusApplicationLoggingCard: application:", application);
  }, [application]);
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null);
};

const QuarkusPage = () => {
  const watchedResources = [
    ModelsPlural.deployments,
    ModelsPlural.secrets,
    ModelsPlural.configmaps,
    ModelsPlural.persistentvolumeclaims
  ];
  const k8sResourcesContextData = useK8sObjectsResponse(watchedResources);
  const [application, setApplication] = useState();
  const [activeTabKey, setActiveTabKey] = useState(0);
  const currentPageLocation = useLocation();
  const handleTabChange = (_, newValue) => {
    setActiveTabKey(newValue);
  };
  useEffect(() => {
    var _a, _b;
    if (!k8sResourcesContextData) {
      return;
    }
    const componentName = currentPageLocation.pathname.split("/")[4];
    const k8sResources = (_b = (_a = k8sResourcesContextData == null ? void 0 : k8sResourcesContextData.watchResourcesData) == null ? void 0 : _a.deployments) == null ? void 0 : _b.data;
    const deployments = (k8sResources ? k8sResources : []).filter((item) => item && item.metadata && item.metadata.labels && item.metadata.labels["backstage.io/kubernetes-id"] === componentName && item.metadata.name && item.metadata.name.startsWith(componentName));
    if (deployments.length === 0) {
      return;
    }
    console.log("deployments:", deployments[0]);
    setApplication(deploymentToApplication(deployments[0]));
  }, [currentPageLocation, k8sResourcesContextData]);
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, application && application.metadata && /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Tabs, { value: activeTabKey, onChange: handleTabChange }, /* @__PURE__ */ React__default.createElement(Tab, { label: "Details" }), /* @__PURE__ */ React__default.createElement(Tab, { label: "Metrics" }), /* @__PURE__ */ React__default.createElement(Tab, { label: "Health" }), /* @__PURE__ */ React__default.createElement(Tab, { label: "Configuration" }), /* @__PURE__ */ React__default.createElement(Tab, { label: "Logging" })), activeTabKey === 0 && /* @__PURE__ */ React__default.createElement(QuarkusApplicationDetailsCard, { application }), activeTabKey === 1 && /* @__PURE__ */ React__default.createElement(QuarkusApplicationMetricsCard, { application }), activeTabKey === 2 && /* @__PURE__ */ React__default.createElement(QuarkusApplicationHealthCard, { application }), activeTabKey === 3 && /* @__PURE__ */ React__default.createElement(QuarkusApplicationConfigurationCard, { application }), activeTabKey === 4 && /* @__PURE__ */ React__default.createElement(QuarkusApplicationLoggingCard, { application })));
};

export { QuarkusPage as default };
//# sourceMappingURL=QuarkusPage-9ec6ae48.esm.js.map
