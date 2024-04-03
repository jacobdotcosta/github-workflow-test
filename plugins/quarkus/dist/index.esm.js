import { scaffolderPlugin } from '@backstage/plugin-scaffolder';
import { createScaffolderFieldExtension } from '@backstage/plugin-scaffolder-react';
import React, { useEffect } from 'react';
import FormControl from '@material-ui/core/FormControl';
import { Progress, Select } from '@backstage/core-components';
import useAsync from 'react-use/lib/useAsync';
import useAutocomplete from '@material-ui/lab/useAutocomplete';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import styled from 'styled-components';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';

function userLabel(v) {
  const key = v.key.split(":");
  if (v.recommended) {
    return `${key[1]} (RECOMMENDED)`;
  } else if (v.status !== "FINAL") {
    return `${key[1]} (${v.status})`;
  } else {
    return key[1];
  }
}
function findRecommendedVersion(versions) {
  let recommendedVersion = "";
  versions.forEach((v) => {
    if (v.recommended) {
      recommendedVersion = v.key;
    }
  });
  return recommendedVersion;
}
const QuarkusVersionList = (props) => {
  const {
    onChange,
    rawErrors,
    required,
    formData
  } = props;
  const codeQuarkusUrl = "https://code.quarkus.io";
  const apiStreamsUrl = `${codeQuarkusUrl}/api/streams`;
  const { loading, value } = useAsync(async () => {
    const response = await fetch(apiStreamsUrl);
    const newData = await response.json();
    const recommendedVersion = findRecommendedVersion(newData);
    console.log(`Recommended version: ${recommendedVersion}`);
    formData !== void 0 ? formData : onChange(recommendedVersion !== "" ? recommendedVersion : newData[0].key);
    return newData;
  });
  const versionItems = value ? value == null ? void 0 : value.map((i) => ({ label: userLabel(i), value: i.key })) : [{ label: "Loading...", value: "loading" }];
  if (loading) {
    return /* @__PURE__ */ React.createElement(Progress, null);
  } else {
    return /* @__PURE__ */ React.createElement(
      FormControl,
      {
        margin: "normal",
        required,
        error: (rawErrors == null ? void 0 : rawErrors.length) > 0 && !formData
      },
      /* @__PURE__ */ React.createElement(
        Select,
        {
          native: true,
          label: "Quarkus versions",
          onChange: (s) => {
            onChange(String(Array.isArray(s) ? s[0] : s));
          },
          selected: formData,
          items: versionItems
        }
      )
    );
  }
};

const Label = styled.label`
    padding: 0 0 4px;
    line-height: 1.5;
    display: block;
    font-size: 1rem;
    font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif;
    font-weight: 400;
    line-height: 1;
`;
const InputWrapper = styled.div`
    width: 300px;
    border: 1px solid #d9d9d9;
    background-color: #fff;
    border-radius: 4px;
    padding: 1px;
    display: flex;
    flex-wrap: wrap;

    &:hover {
        border-color: #40a9ff;
    }

    &.focused {
        border-color: #40a9ff;
        box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
    }

    & input {
        font-size: 14px;
        height: 30px;
        box-sizing: border-box;
        padding: 4px 6px;
        width: 0;
        min-width: 30px;
        flex-grow: 1;
        border: 0;
        margin: 0;
        outline: 0;
    }
`;
const Tag = styled(({ label, onDelete, ...props }) => /* @__PURE__ */ React.createElement("div", { ...props }, /* @__PURE__ */ React.createElement("span", null, label), /* @__PURE__ */ React.createElement(CloseIcon, { onClick: onDelete })))`
    display: flex;
    align-items: center;
    height: 24px;
    margin: 2px;
    line-height: 22px;
    background-color: #fafafa;
    border: 1px solid #e8e8e8;
    border-radius: 2px;
    box-sizing: content-box;
    padding: 0 4px 0 10px;
    outline: 0;
    overflow: hidden;

    &:focus {
        border-color: #40a9ff;
        background-color: #e6f7ff;
    }

    & span {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    & svg {
        font-size: 12px;
        cursor: pointer;
        padding: 4px;
    }
`;
const Listbox = styled.ul`
    width: 300px;
    margin: 2px 0 0;
    padding: 0;
    position: absolute;
    list-style: none;
    background-color: #fff;
    overflow: auto;
    max-height: 250px;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    z-index: 1;

    & li {
        padding: 5px 12px;
        display: flex;

        & span {
            flex-grow: 1;
        }

        & svg {
            color: transparent;
        }
    }

    & li[aria-selected='true'] {
        background-color: #fafafa;
        font-weight: 600;

        & svg {
            color: #1890ff;
        }
    }

    & li[data-focus='true'] {
        background-color: #e6f7ff;
        cursor: pointer;

        & svg {
            color: #000;
        }
    }
`;
const QuarkusExtensionList = ({ onChange, rawErrors, required, formData, uiSchema }) => {
  var _a, _b, _c, _d, _e, _f, _g;
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl
  } = useAutocomplete({
    id: "quarkus-extension-list",
    // TODO: Check if the code change does not break the logic of the plugin
    defaultValue: quarkusExtensions && quarkusExtensions.length > 0 ? [{ id: quarkusExtensions[0].id, name: quarkusExtensions[0].name }] : [],
    multiple: true,
    options: uniqueExtensions(sortExtensions(quarkusExtensions)),
    getOptionLabel: (option) => option.id
  });
  const headers = {
    "Content-Type": "application/json",
    // Adjust as needed
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*"
  };
  const axiosRequestConfig = {
    headers
  };
  const codeQuarkusUrl = (_b = (_a = (uiSchema != null ? uiSchema : {})["ui:options"]) == null ? void 0 : _a.codeQuarkusUrl) != null ? _b : "https://code.quarkus.io";
  const apiUrl = `${codeQuarkusUrl}/api/extensions`;
  const filter = (_d = (_c = (uiSchema != null ? uiSchema : {})["ui:options"]) == null ? void 0 : _c.filter) != null ? _d : {};
  const filteredExtensions = (_e = filter == null ? void 0 : filter.extensions) != null ? _e : [];
  const filteredCategories = (_f = filter == null ? void 0 : filter.categories) != null ? _f : [];
  const filteredKeywords = (_g = filter == null ? void 0 : filter.keywords) != null ? _g : [];
  const filterExtension = (e) => {
    const matchingCategory = !filteredCategories || filteredCategories.length == 0 || filteredCategories.some((regex) => !e.category || e.category.match(regex));
    const matchingName = !filteredExtensions || filteredExtensions.length == 0 || filteredExtensions.some((regex) => e.id.match(regex));
    const matchingKeywords = !filteredKeywords || filteredKeywords.length == 0 || filteredKeywords.some((regex) => !e.keywords || e.keywords.some((keyword) => keyword.match(regex)));
    return matchingCategory && matchingKeywords && matchingName;
  };
  useEffect(() => {
    axios.get(apiUrl, axiosRequestConfig).then((response) => {
      response.data.forEach((e) => {
        if (filterExtension(e)) {
          quarkusExtensions.push({ id: e.id, name: e.name });
        }
      });
    }).catch((error) => {
      console.log("Error fetching Quarkus Extensions:", error);
    });
  }, []);
  useEffect(() => {
    onChange(value.filter((extension) => extension.id).map((extension) => extension.id));
  }, [value]);
  return /* @__PURE__ */ React.createElement(
    FormControl,
    {
      margin: "normal",
      required,
      error: rawErrors && (rawErrors == null ? void 0 : rawErrors.length) > 0 && !formData
    },
    /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { ...getRootProps() }, /* @__PURE__ */ React.createElement(Label, { ...getInputLabelProps() }, "Quarkus Extension(s)"), /* @__PURE__ */ React.createElement(InputWrapper, { ref: setAnchorEl, className: focused ? "focused" : "" }, value.map((option, index) => option.name && /* @__PURE__ */ React.createElement(Tag, { label: option.name, ...getTagProps({ index }) })), /* @__PURE__ */ React.createElement("input", { ...getInputProps() }))), groupedOptions.length > 0 ? /* @__PURE__ */ React.createElement(Listbox, { ...getListboxProps() }, groupedOptions.map((option, index) => /* @__PURE__ */ React.createElement("li", { ...getOptionProps({ option, index }) }, /* @__PURE__ */ React.createElement("span", null, option.name), /* @__PURE__ */ React.createElement(CheckIcon, { fontSize: "small" })))) : null)
  );
};
function uniqueExtensions(extensions) {
  return extensions.filter((obj, index, self) => index === self.findIndex((e) => e.name === obj.name));
}
function sortExtensions(extensions) {
  return extensions.sort((a, b) => a.name.localeCompare(b.name));
}
const quarkusExtensions = [];

const useStyles = makeStyles((theme) => ({
  label: {
    display: "block",
    color: "rgba(0, 0, 0, 0.54)",
    padding: 0,
    fontSize: "1rem",
    fontFamily: "Helvetica Neue",
    fontWeight: 400,
    lineHeight: 1
  },
  input: {
    width: 350,
    padding: "3px",
    margin: 1,
    color: "currentColor",
    borderRadius: "4px",
    fontSize: "1rem",
    fontFamily: "Helvetica Neue",
    backgroundColor: theme.palette.background.paper
  },
  listbox: {
    width: 350,
    margin: 1,
    padding: "3px",
    borderRadius: "4px",
    zIndex: 1,
    position: "absolute",
    listStyle: "none",
    fontSize: "1rem",
    fontFamily: "Helvetica Neue",
    backgroundColor: theme.palette.background.paper,
    overflow: "auto",
    maxHeight: 200,
    border: "1px solid rgba(0,0,0,.25)",
    '& li[data-focus="true"]': {
      backgroundColor: "#4a8df6",
      color: "white",
      cursor: "pointer"
    },
    "& li:active": {
      backgroundColor: "#2977f5",
      color: "white"
    }
  }
}));
const QuarkusQuickstartPicker = ({ onChange, rawErrors, required, formData }) => {
  const classes = useStyles(), {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value
  } = useAutocomplete({
    id: "quarkus-quickstarts",
    defaultValue: quarkusQuickstarts[0],
    multiple: false,
    options: quarkusQuickstarts,
    getOptionLabel: (option) => option
  });
  useEffect(() => {
    axios.get("https://api.github.com/repos/quarkusio/quarkus-quickstarts/contents").then((response) => {
      response.data.filter((e) => e.type === "dir" && e.name.endsWith("-quickstart")).forEach((e) => {
        quarkusQuickstarts.push(e.name);
      });
    });
  }, []);
  useEffect(() => {
    if (value) {
      onChange(value);
    }
  }, [value]);
  return /* @__PURE__ */ React.createElement(
    FormControl,
    {
      margin: "normal",
      required,
      error: rawErrors && (rawErrors == null ? void 0 : rawErrors.length) > 0 && !formData
    },
    /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { ...getRootProps() }, /* @__PURE__ */ React.createElement("label", { className: classes.label, ...getInputLabelProps() }, "Quarkus Quickstart"), /* @__PURE__ */ React.createElement("input", { className: classes.input, ...getInputProps() })), groupedOptions.length > 0 ? /* @__PURE__ */ React.createElement("ul", { className: classes.listbox, ...getListboxProps() }, groupedOptions.map((option, index) => /* @__PURE__ */ React.createElement("li", { ...getOptionProps({ option, index }) }, option))) : null)
  );
};
const quarkusQuickstarts = [];
const validateQuarkusQuickstart = (value, validation) => {
  if (!quarkusQuickstarts.some((quickstart) => quickstart === value)) {
    validation.addError(`Unknown quickstart: ${value}`);
  }
};

const QuarkusExtensionListField = scaffolderPlugin.provide(
  createScaffolderFieldExtension({
    name: "QuarkusExtensionList",
    component: QuarkusExtensionList
  })
), QuarkusVersionListField = scaffolderPlugin.provide(
  createScaffolderFieldExtension({
    name: "QuarkusVersionList",
    component: QuarkusVersionList
  })
), QuarkusQuickstartPickerField = scaffolderPlugin.provide(
  createScaffolderFieldExtension({
    name: "QuarkusQuickstartPicker",
    component: QuarkusQuickstartPicker,
    validation: validateQuarkusQuickstart
  })
);

export { QuarkusExtensionListField, QuarkusQuickstartPickerField, QuarkusVersionListField };
//# sourceMappingURL=index.esm.js.map
