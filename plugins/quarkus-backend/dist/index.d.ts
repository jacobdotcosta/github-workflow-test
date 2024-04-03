import * as _backstage_plugin_scaffolder_node from '@backstage/plugin-scaffolder-node';
import * as _backstage_types from '@backstage/types';

declare const createQuarkusApp: () => _backstage_plugin_scaffolder_node.TemplateAction<{
    url: string;
    targetPath: string;
    values: any;
}, _backstage_types.JsonObject>;

declare const cloneQuarkusQuickstart: () => _backstage_plugin_scaffolder_node.TemplateAction<{
    url: string;
    targetPath: string;
    values: any;
}, _backstage_types.JsonObject>;

export { cloneQuarkusQuickstart, createQuarkusApp };
