import { a5 as vueExports, L as useAsyncData, G as serverRenderer_cjs_prodExports, c as _sfc_main$8, d as _sfc_main$d } from './server.mjs';
import { _ as _sfc_main$1 } from './Select-5iHH8d-R.mjs';
import { _ as _sfc_main$2 } from './Card-BRUpc_qj.mjs';
import { _ as _sfc_main$3 } from './Badge-72nfR9SL.mjs';
import { u as useApi } from './useApi-DoKmTMMO.mjs';
import '../nitro/nitro.mjs';
import 'mongoose';
import 'bcrypt';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'jsonwebtoken';
import '@iconify/utils';
import 'consola';
import 'tailwindcss/colors';
import 'node:stream';
import 'perfect-debounce';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'vue/server-renderer';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue';

const limit = 20;
const _sfc_main = /* @__PURE__ */ vueExports.defineComponent({
  __name: "audit-log",
  __ssrInlineRender: true,
  setup(__props) {
    const $api = useApi();
    const page = vueExports.ref(1);
    const resourceTypeFilter = vueExports.ref(null);
    const RESOURCE_TYPES = [
      { label: "All types", value: null },
      { label: "Permission", value: "permission" },
      { label: "User", value: "user" },
      { label: "Application", value: "application" }
    ];
    const { data, pending, refresh } = useAsyncData(
      () => `audit-log-${page.value}-${resourceTypeFilter.value}`,
      () => {
        const params = new URLSearchParams();
        if (resourceTypeFilter.value) params.set("resourceType", resourceTypeFilter.value);
        params.set("page", String(page.value));
        params.set("limit", String(limit));
        return $api(`/api/admin/audit-log?${params.toString()}`);
      },
      { watch: [page, resourceTypeFilter] }
    );
    vueExports.watch(resourceTypeFilter, () => {
      page.value = 1;
    });
    const logs = vueExports.computed(() => data.value?.logs ?? []);
    const total = vueExports.computed(() => data.value?.total ?? 0);
    const totalPages = vueExports.computed(() => Math.ceil(total.value / limit));
    function formatDate(iso) {
      return new Date(iso).toLocaleString();
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$8;
      const _component_USelect = _sfc_main$1;
      const _component_UCard = _sfc_main$2;
      const _component_UIcon = _sfc_main$d;
      const _component_UBadge = _sfc_main$3;
      _push(`<div${serverRenderer_cjs_prodExports.ssrRenderAttrs(vueExports.mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center justify-between"><div><h2 class="text-2xl font-bold text-foreground"> Audit Log </h2><p class="text-sm text-muted-foreground mt-1"> Permission changes and admin actions </p></div>`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
        variant: "ghost",
        color: "neutral",
        icon: "i-heroicons-arrow-path",
        loading: vueExports.unref(pending),
        onClick: () => vueExports.unref(refresh)()
      }, null, _parent));
      _push(`</div><div class="flex gap-3">`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_USelect, {
        modelValue: vueExports.unref(resourceTypeFilter),
        "onUpdate:modelValue": ($event) => vueExports.isRef(resourceTypeFilter) ? resourceTypeFilter.value = $event : null,
        items: RESOURCE_TYPES,
        class: "w-48"
      }, null, _parent));
      _push(`</div>`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UCard, null, {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (vueExports.unref(pending)) {
              _push2(`<div class="flex items-center justify-center py-12"${_scopeId}>`);
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-arrow-path",
                class: "w-6 h-6 animate-spin text-muted-foreground"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else if (vueExports.unref(logs).length === 0) {
              _push2(`<div class="text-center py-12 text-muted-foreground"${_scopeId}> No audit log entries found </div>`);
            } else {
              _push2(`<div class="overflow-x-auto"${_scopeId}><table class="w-full text-sm"${_scopeId}><thead${_scopeId}><tr class="border-b border-border text-left"${_scopeId}><th class="pb-3 pr-4 font-medium text-muted-foreground whitespace-nowrap"${_scopeId}> Timestamp </th><th class="pb-3 pr-4 font-medium text-muted-foreground"${_scopeId}> Actor </th><th class="pb-3 pr-4 font-medium text-muted-foreground"${_scopeId}> Action </th><th class="pb-3 pr-4 font-medium text-muted-foreground"${_scopeId}> Resource </th><th class="pb-3 font-medium text-muted-foreground"${_scopeId}> Details </th></tr></thead><tbody class="divide-y divide-border"${_scopeId}><!--[-->`);
              serverRenderer_cjs_prodExports.ssrRenderList(vueExports.unref(logs), (entry) => {
                _push2(`<tr class="hover:bg-muted/40 transition-colors"${_scopeId}><td class="py-3 pr-4 text-muted-foreground text-xs whitespace-nowrap"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(formatDate(entry.createdAt))}</td><td class="py-3 pr-4 font-medium"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(entry.actorEmail ?? entry.actorId)}</td><td class="py-3 pr-4"${_scopeId}>`);
                _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UBadge, {
                  variant: "subtle",
                  color: "info",
                  size: "sm"
                }, {
                  default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${serverRenderer_cjs_prodExports.ssrInterpolate(entry.action)}`);
                    } else {
                      return [
                        vueExports.createTextVNode(vueExports.toDisplayString(entry.action), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</td><td class="py-3 pr-4 text-muted-foreground"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(entry.resourceType)} `);
                if (entry.resourceId) {
                  _push2(`<span class="font-mono text-xs ml-1"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(entry.resourceId)}</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</td><td class="py-3 text-xs text-muted-foreground font-mono max-w-xs truncate"${_scopeId}>`);
                if (entry.details) {
                  _push2(`<span${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(JSON.stringify(entry.details))}</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</td></tr>`);
              });
              _push2(`<!--]--></tbody></table></div>`);
            }
            if (vueExports.unref(totalPages) > 1) {
              _push2(`<div class="flex items-center justify-between pt-4 border-t border-border mt-4"${_scopeId}><p class="text-sm text-muted-foreground"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(total))} entries total </p><div class="flex gap-2"${_scopeId}>`);
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
                size: "sm",
                variant: "outline",
                disabled: vueExports.unref(page) <= 1,
                icon: "i-heroicons-chevron-left",
                onClick: ($event) => page.value--
              }, null, _parent2, _scopeId));
              _push2(`<span class="text-sm flex items-center px-2"${_scopeId}>${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(page))} / ${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(totalPages))}</span>`);
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
                size: "sm",
                variant: "outline",
                disabled: vueExports.unref(page) >= vueExports.unref(totalPages),
                icon: "i-heroicons-chevron-right",
                onClick: ($event) => page.value++
              }, null, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              vueExports.unref(pending) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                key: 0,
                class: "flex items-center justify-center py-12"
              }, [
                vueExports.createVNode(_component_UIcon, {
                  name: "i-heroicons-arrow-path",
                  class: "w-6 h-6 animate-spin text-muted-foreground"
                })
              ])) : vueExports.unref(logs).length === 0 ? (vueExports.openBlock(), vueExports.createBlock("div", {
                key: 1,
                class: "text-center py-12 text-muted-foreground"
              }, " No audit log entries found ")) : (vueExports.openBlock(), vueExports.createBlock("div", {
                key: 2,
                class: "overflow-x-auto"
              }, [
                vueExports.createVNode("table", { class: "w-full text-sm" }, [
                  vueExports.createVNode("thead", null, [
                    vueExports.createVNode("tr", { class: "border-b border-border text-left" }, [
                      vueExports.createVNode("th", { class: "pb-3 pr-4 font-medium text-muted-foreground whitespace-nowrap" }, " Timestamp "),
                      vueExports.createVNode("th", { class: "pb-3 pr-4 font-medium text-muted-foreground" }, " Actor "),
                      vueExports.createVNode("th", { class: "pb-3 pr-4 font-medium text-muted-foreground" }, " Action "),
                      vueExports.createVNode("th", { class: "pb-3 pr-4 font-medium text-muted-foreground" }, " Resource "),
                      vueExports.createVNode("th", { class: "pb-3 font-medium text-muted-foreground" }, " Details ")
                    ])
                  ]),
                  vueExports.createVNode("tbody", { class: "divide-y divide-border" }, [
                    (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(logs), (entry) => {
                      return vueExports.openBlock(), vueExports.createBlock("tr", {
                        key: entry._id,
                        class: "hover:bg-muted/40 transition-colors"
                      }, [
                        vueExports.createVNode("td", { class: "py-3 pr-4 text-muted-foreground text-xs whitespace-nowrap" }, vueExports.toDisplayString(formatDate(entry.createdAt)), 1),
                        vueExports.createVNode("td", { class: "py-3 pr-4 font-medium" }, vueExports.toDisplayString(entry.actorEmail ?? entry.actorId), 1),
                        vueExports.createVNode("td", { class: "py-3 pr-4" }, [
                          vueExports.createVNode(_component_UBadge, {
                            variant: "subtle",
                            color: "info",
                            size: "sm"
                          }, {
                            default: vueExports.withCtx(() => [
                              vueExports.createTextVNode(vueExports.toDisplayString(entry.action), 1)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        vueExports.createVNode("td", { class: "py-3 pr-4 text-muted-foreground" }, [
                          vueExports.createTextVNode(vueExports.toDisplayString(entry.resourceType) + " ", 1),
                          entry.resourceId ? (vueExports.openBlock(), vueExports.createBlock("span", {
                            key: 0,
                            class: "font-mono text-xs ml-1"
                          }, vueExports.toDisplayString(entry.resourceId), 1)) : vueExports.createCommentVNode("", true)
                        ]),
                        vueExports.createVNode("td", { class: "py-3 text-xs text-muted-foreground font-mono max-w-xs truncate" }, [
                          entry.details ? (vueExports.openBlock(), vueExports.createBlock("span", { key: 0 }, vueExports.toDisplayString(JSON.stringify(entry.details)), 1)) : vueExports.createCommentVNode("", true)
                        ])
                      ]);
                    }), 128))
                  ])
                ])
              ])),
              vueExports.unref(totalPages) > 1 ? (vueExports.openBlock(), vueExports.createBlock("div", {
                key: 3,
                class: "flex items-center justify-between pt-4 border-t border-border mt-4"
              }, [
                vueExports.createVNode("p", { class: "text-sm text-muted-foreground" }, vueExports.toDisplayString(vueExports.unref(total)) + " entries total ", 1),
                vueExports.createVNode("div", { class: "flex gap-2" }, [
                  vueExports.createVNode(_component_UButton, {
                    size: "sm",
                    variant: "outline",
                    disabled: vueExports.unref(page) <= 1,
                    icon: "i-heroicons-chevron-left",
                    onClick: ($event) => page.value--
                  }, null, 8, ["disabled", "onClick"]),
                  vueExports.createVNode("span", { class: "text-sm flex items-center px-2" }, vueExports.toDisplayString(vueExports.unref(page)) + " / " + vueExports.toDisplayString(vueExports.unref(totalPages)), 1),
                  vueExports.createVNode(_component_UButton, {
                    size: "sm",
                    variant: "outline",
                    disabled: vueExports.unref(page) >= vueExports.unref(totalPages),
                    icon: "i-heroicons-chevron-right",
                    onClick: ($event) => page.value++
                  }, null, 8, ["disabled", "onClick"])
                ])
              ])) : vueExports.createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/audit-log.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=audit-log-7K8xXuYP.mjs.map
