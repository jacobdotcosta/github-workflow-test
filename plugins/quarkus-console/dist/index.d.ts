/// <reference types="react" />
import * as React from 'react';
import React__default from 'react';
import * as _backstage_core_plugin_api from '@backstage/core-plugin-api';
import { V1ObjectMeta, V1PodSpec, V1DeploymentCondition } from '@kubernetes/client-node';
import { SvgIconProps } from '@material-ui/core';

declare const QuarkusConsolePlugin: _backstage_core_plugin_api.BackstagePlugin<{
    root: _backstage_core_plugin_api.RouteRef<undefined>;
}, {}, {}>;
declare const QuarkusConsolePage: () => React.JSX.Element;

type Snapshot = {
    name: string;
    x: string;
    y: number;
};
type Metrics = {
    cpu?: Snapshot[];
    memory?: Snapshot[];
    gcPause?: Snapshot[];
    gcOverhead?: Snapshot[];
};
type Application = {
    apiVersion?: string;
    kind?: string;
    metadata?: V1ObjectMeta;
    cpu?: string;
    memory?: string;
    url?: string;
    metrics?: Metrics;
    spec?: V1PodSpec;
    status?: {
        availableReplicas?: number;
        collisionCount?: number;
        conditions?: V1DeploymentCondition[];
        observedGeneration?: number;
        readyReplicas?: number;
        replicas?: number;
        unavailableReplicas?: number;
        updatedReplicas?: number;
    };
};
interface ApplicationPageProps {
    application: Application;
}

declare const QuarkusApplicationDetailsCard: React__default.FC<ApplicationPageProps>;

declare const QuarkusIcon: (props: SvgIconProps) => React__default.JSX.Element;

export { QuarkusApplicationDetailsCard, QuarkusConsolePage, QuarkusConsolePlugin, QuarkusIcon };
