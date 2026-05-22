import { a5 as vueExports, M as useAuth, a2 as useRouter, a1 as useRoute$1, G as serverRenderer_cjs_prodExports, _ as __nuxt_component_0$1, d as _sfc_main$d, c as _sfc_main$8 } from './server.mjs';
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

const _sfc_main = /* @__PURE__ */ vueExports.defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const isMobileMenuOpen = vueExports.ref(false);
    const { user, logout } = useAuth();
    const router = useRouter();
    const route = useRoute$1();
    const mainNavigation = [
      { name: "Dashboard", to: "/", icon: "i-heroicons-home" },
      { name: "Applications", to: "/applications", icon: "i-heroicons-document-text" },
      { name: "Students", to: "/students", icon: "i-heroicons-academic-cap" },
      { name: "Communications", to: "/communications", icon: "i-heroicons-chat-bubble-left-right" },
      { name: "Reports", to: "/reports", icon: "i-heroicons-chart-bar" },
      { name: "Settings", to: "/settings", icon: "i-heroicons-cog-6-tooth" }
    ];
    const adminNavigation = [
      { name: "Users", to: "/admin/users", icon: "i-heroicons-shield-check" },
      { name: "Audit Log", to: "/admin/audit-log", icon: "i-heroicons-clipboard-document-list" }
    ];
    const currentUser = vueExports.computed(() => user.value);
    const userPermissions = vueExports.computed(() => currentUser.value?.permissions ?? []);
    const isAdmin = vueExports.computed(
      () => userPermissions.value.includes("users:read") || userPermissions.value.includes("*")
    );
    const allNavItems = vueExports.computed(() => [
      ...mainNavigation,
      ...isAdmin.value ? adminNavigation : []
    ]);
    const pageTitle = vueExports.computed(() => {
      const match = allNavItems.value.find(
        (item) => item.to === "/" ? route.path === "/" : route.path.startsWith(item.to)
      );
      return match?.name ?? "EnrollGSRP";
    });
    const userDisplayName = vueExports.computed(() => {
      const u = currentUser.value;
      if (!u) return "";
      return u.firstName ? `${u.firstName} ${u.lastName ?? ""}`.trim() : u.email;
    });
    const userInitials = vueExports.computed(() => {
      const u = currentUser.value;
      if (!u?.firstName) return "?";
      return `${u.firstName[0]}${u.lastName?.[0] ?? ""}`.toUpperCase();
    });
    function isActive(to) {
      return to === "/" ? route.path === "/" : route.path.startsWith(to);
    }
    async function handleLogout() {
      logout();
      await router.push("/login");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_UIcon = _sfc_main$d;
      const _component_UButton = _sfc_main$8;
      _push(`<div${serverRenderer_cjs_prodExports.ssrRenderAttrs(_attrs)}>`);
      if (vueExports.unref(isMobileMenuOpen)) {
        _push(`<div class="fixed inset-0 bg-black/50 z-40 lg:hidden"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex min-h-screen bg-background"><aside class="${serverRenderer_cjs_prodExports.ssrRenderClass([
        "fixed lg:static inset-y-0 left-0 z-50",
        "w-64 bg-card border-r border-border flex flex-col",
        "transform transition-transform duration-300",
        vueExports.unref(isMobileMenuOpen) ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      ])}"><div class="p-6 border-b border-border shrink-0">`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "text-2xl font-bold text-primary",
        onClick: ($event) => isMobileMenuOpen.value = false
      }, {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` EnrollGSRP `);
          } else {
            return [
              vueExports.createTextVNode(" EnrollGSRP ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><nav class="p-4 space-y-1 flex-1 overflow-y-auto"><!--[-->`);
      serverRenderer_cjs_prodExports.ssrRenderList(mainNavigation, (item) => {
        _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_NuxtLink, {
          key: item.to,
          to: item.to,
          class: ["flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors", isActive(item.to) ? "bg-primary text-white" : "text-foreground hover:bg-muted"],
          onClick: ($event) => isMobileMenuOpen.value = false
        }, {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                name: item.icon,
                class: "w-5 h-5 shrink-0"
              }, null, _parent2, _scopeId));
              _push2(` ${serverRenderer_cjs_prodExports.ssrInterpolate(item.name)}`);
            } else {
              return [
                vueExports.createVNode(_component_UIcon, {
                  name: item.icon,
                  class: "w-5 h-5 shrink-0"
                }, null, 8, ["name"]),
                vueExports.createTextVNode(" " + vueExports.toDisplayString(item.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]-->`);
      if (vueExports.unref(isAdmin)) {
        _push(`<!--[--><div class="pt-4 pb-1 px-3"><p class="text-xs font-semibold uppercase tracking-wider text-muted-foreground"> Admin </p></div><!--[-->`);
        serverRenderer_cjs_prodExports.ssrRenderList(adminNavigation, (item) => {
          _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_NuxtLink, {
            key: item.to,
            to: item.to,
            class: ["flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors", isActive(item.to) ? "bg-primary text-white" : "text-foreground hover:bg-muted"],
            onClick: ($event) => isMobileMenuOpen.value = false
          }, {
            default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UIcon, {
                  name: item.icon,
                  class: "w-5 h-5 shrink-0"
                }, null, _parent2, _scopeId));
                _push2(` ${serverRenderer_cjs_prodExports.ssrInterpolate(item.name)}`);
              } else {
                return [
                  vueExports.createVNode(_component_UIcon, {
                    name: item.icon,
                    class: "w-5 h-5 shrink-0"
                  }, null, 8, ["name"]),
                  vueExports.createTextVNode(" " + vueExports.toDisplayString(item.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</nav><div class="p-4 border-t border-border shrink-0">`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
        color: "primary",
        variant: "solid",
        icon: "i-heroicons-plus",
        block: "",
        size: "md",
        disabled: ""
      }, {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` New Application `);
          } else {
            return [
              vueExports.createTextVNode(" New Application ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></aside><main class="flex-1 flex flex-col min-h-0"><header class="h-16 border-b border-border bg-card flex items-center justify-between px-4 lg:px-6 shrink-0">`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
        icon: "i-heroicons-bars-3",
        variant: "ghost",
        color: "neutral",
        class: "lg:hidden",
        onClick: ($event) => isMobileMenuOpen.value = !vueExports.unref(isMobileMenuOpen)
      }, null, _parent));
      _push(`<h1 class="text-lg font-semibold text-foreground">${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(pageTitle))}</h1><div class="flex items-center gap-3"><span class="hidden sm:block text-sm text-muted-foreground">${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(userDisplayName))}</span><div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary select-none">${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(userInitials))}</div>`);
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(_component_UButton, {
        variant: "ghost",
        color: "neutral",
        icon: "i-heroicons-arrow-right-on-rectangle",
        size: "sm",
        title: "Sign out",
        onClick: handleLogout
      }, null, _parent));
      _push(`</div></header><div class="flex-1 overflow-auto p-4 lg:p-6">`);
      serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></main></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-BbOwvGqm.mjs.map
