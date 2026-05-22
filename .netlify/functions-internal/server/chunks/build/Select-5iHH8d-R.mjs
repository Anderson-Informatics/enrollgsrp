import { a5 as vueExports, K as useAppConfig, Q as useComponentUI, X as useForwardPropsEmits, C as reactivePick, Z as usePortal, S as useFormField, R as useFieldGroup, O as useComponentIcons, I as tv, w as isArrayOfArray, G as serverRenderer_cjs_prodExports, d as _sfc_main$d, e as _sfc_main$b, F as FieldGroupReset, p as get, f as _sfc_main$c, a3 as useVModel, x as isNullish, N as useCollection, y as looseToNumber, U as useForwardExpose, b as Primitive, r as getDisplayValue, T as Teleport_default, P as Presence_default, u as injectConfigProviderContext, J as unrefElement, h as createContext, V as VisuallyHidden_default, a4 as vue, D as refAutoReset, W as useForwardProps, q as getActiveElement, H as tryOnBeforeUnmount, A as AUTOFOCUS_ON_MOUNT, l as focusFirst$1, s as getTabbableCandidates, k as focus, a as AUTOFOCUS_ON_UNMOUNT, B as onKeyStroke, a0 as useResizeObserver, j as createSharedComposable, E as EVENT_OPTIONS, t as getTabbableEdges, g as computedEager, i as createGlobalState } from './server.mjs';
import { h as defu, B as isEqual } from '../nitro/nitro.mjs';

function clamp$1(value, min2 = Number.NEGATIVE_INFINITY, max2 = Number.POSITIVE_INFINITY) {
  return Math.min(max2, Math.max(min2, value));
}
function handleAndDispatchCustomEvent(name, handler, detail) {
  const target = detail.originalEvent.target;
  const event = new CustomEvent(name, {
    bubbles: false,
    cancelable: true,
    detail
  });
  if (handler) target.addEventListener(name, handler, { once: true });
  target.dispatchEvent(event);
}
const useBodyLockStackCount = createSharedComposable(() => {
  const map = vueExports.ref(/* @__PURE__ */ new Map());
  vueExports.ref();
  const locked = vueExports.computed(() => {
    for (const value of map.value.values()) if (value) return true;
    return false;
  });
  injectConfigProviderContext({ scrollBody: vueExports.ref(true) });
  vueExports.watch(locked, (val, oldVal) => {
    return;
  }, {
    immediate: true,
    flush: "sync"
  });
  return map;
});
function useBodyScrollLock(initialState) {
  const id = Math.random().toString(36).substring(2, 7);
  const map = useBodyLockStackCount();
  map.value.set(id, initialState ?? false);
  const locked = vueExports.computed({
    get: () => map.value.get(id) ?? false,
    set: (value) => map.value.set(id, value)
  });
  tryOnBeforeUnmount();
  return locked;
}
function useDirection(dir) {
  const context2 = injectConfigProviderContext({ dir: vueExports.ref("ltr") });
  return vueExports.computed(() => dir?.value || context2.dir?.value || "ltr");
}
function useFocusGuards() {
  vueExports.watchEffect((cleanupFn) => {
    return;
  });
}
function useFormControl(el) {
  return vueExports.computed(() => vueExports.toValue(el) ? Boolean(unrefElement(el)?.closest("form")) : true);
}
var getDefaultParent = function(originalTarget) {
  {
    return null;
  }
};
var counterMap = /* @__PURE__ */ new WeakMap();
var uncontrolledNodes = /* @__PURE__ */ new WeakMap();
var markerMap = {};
var lockCount = 0;
var unwrapHost = function(node) {
  return node && (node.host || unwrapHost(node.parentNode));
};
var correctTargets = function(parent, targets) {
  return targets.map(function(target) {
    if (parent.contains(target)) {
      return target;
    }
    var correctedTarget = unwrapHost(target);
    if (correctedTarget && parent.contains(correctedTarget)) {
      return correctedTarget;
    }
    console.error("aria-hidden", target, "in not contained inside", parent, ". Doing nothing");
    return null;
  }).filter(function(x) {
    return Boolean(x);
  });
};
var applyAttributeToOthers = function(originalTarget, parentNode, markerName, controlAttribute) {
  var targets = correctTargets(parentNode, Array.isArray(originalTarget) ? originalTarget : [originalTarget]);
  if (!markerMap[markerName]) {
    markerMap[markerName] = /* @__PURE__ */ new WeakMap();
  }
  var markerCounter = markerMap[markerName];
  var hiddenNodes = [];
  var elementsToKeep = /* @__PURE__ */ new Set();
  var elementsToStop = new Set(targets);
  var keep = function(el) {
    if (!el || elementsToKeep.has(el)) {
      return;
    }
    elementsToKeep.add(el);
    keep(el.parentNode);
  };
  targets.forEach(keep);
  var deep = function(parent) {
    if (!parent || elementsToStop.has(parent)) {
      return;
    }
    Array.prototype.forEach.call(parent.children, function(node) {
      if (elementsToKeep.has(node)) {
        deep(node);
      } else {
        try {
          var attr = node.getAttribute(controlAttribute);
          var alreadyHidden = attr !== null && attr !== "false";
          var counterValue = (counterMap.get(node) || 0) + 1;
          var markerValue = (markerCounter.get(node) || 0) + 1;
          counterMap.set(node, counterValue);
          markerCounter.set(node, markerValue);
          hiddenNodes.push(node);
          if (counterValue === 1 && alreadyHidden) {
            uncontrolledNodes.set(node, true);
          }
          if (markerValue === 1) {
            node.setAttribute(markerName, "true");
          }
          if (!alreadyHidden) {
            node.setAttribute(controlAttribute, "true");
          }
        } catch (e) {
          console.error("aria-hidden: cannot operate on ", node, e);
        }
      }
    });
  };
  deep(parentNode);
  elementsToKeep.clear();
  lockCount++;
  return function() {
    hiddenNodes.forEach(function(node) {
      var counterValue = counterMap.get(node) - 1;
      var markerValue = markerCounter.get(node) - 1;
      counterMap.set(node, counterValue);
      markerCounter.set(node, markerValue);
      if (!counterValue) {
        if (!uncontrolledNodes.has(node)) {
          node.removeAttribute(controlAttribute);
        }
        uncontrolledNodes.delete(node);
      }
      if (!markerValue) {
        node.removeAttribute(markerName);
      }
    });
    lockCount--;
    if (!lockCount) {
      counterMap = /* @__PURE__ */ new WeakMap();
      counterMap = /* @__PURE__ */ new WeakMap();
      uncontrolledNodes = /* @__PURE__ */ new WeakMap();
      markerMap = {};
    }
  };
};
var hideOthers = function(originalTarget, parentNode, markerName) {
  if (markerName === void 0) {
    markerName = "data-aria-hidden";
  }
  var targets = Array.from(Array.isArray(originalTarget) ? originalTarget : [originalTarget]);
  var activeParentNode = getDefaultParent();
  if (!activeParentNode) {
    return function() {
      return null;
    };
  }
  targets.push.apply(targets, Array.from(activeParentNode.querySelectorAll("[aria-live], script")));
  return applyAttributeToOthers(targets, activeParentNode, markerName, "aria-hidden");
};
function useHideOthers(target) {
  let undo;
  vueExports.watch(() => unrefElement(target), (el) => {
    let isInsideClosedPopover = false;
    try {
      isInsideClosedPopover = !!el?.closest("[popover]:not(:popover-open)");
    } catch {
    }
    if (el && !isInsideClosedPopover) undo = hideOthers(el);
    else if (undo) undo();
  });
}
let count = 0;
function useId(deterministicId, prefix = "reka") {
  let id;
  if ("useId" in vue) id = vueExports.useId?.();
  else {
    const configProviderContext = injectConfigProviderContext({ useId: void 0 });
    id = configProviderContext.useId?.() ?? `${++count}`;
  }
  return prefix ? `${prefix}-${id}` : id;
}
function useSize(element) {
  const size2 = vueExports.ref();
  const width = vueExports.computed(() => size2.value?.width ?? 0);
  const height = vueExports.computed(() => size2.value?.height ?? 0);
  return {
    width,
    height
  };
}
function useTypeahead(callback) {
  const search = refAutoReset("", 1e3);
  const handleTypeaheadSearch = (key, items) => {
    search.value = search.value + key;
    {
      const currentItem = getActiveElement();
      const itemsWithTextValue = items.map((item) => ({
        ...item,
        textValue: item.value?.textValue ?? item.ref.textContent?.trim() ?? ""
      }));
      const currentMatch = itemsWithTextValue.find((item) => item.ref === currentItem);
      const values = itemsWithTextValue.map((item) => item.textValue);
      const nextMatch = getNextMatch(values, search.value, currentMatch?.textValue);
      const newItem = itemsWithTextValue.find((item) => item.textValue === nextMatch);
      if (newItem) newItem.ref.focus();
      return newItem?.ref;
    }
  };
  const resetTypeahead = () => {
    search.value = "";
  };
  return {
    search,
    handleTypeaheadSearch,
    resetTypeahead
  };
}
function wrapArray(array, startIndex) {
  return array.map((_, index) => array[(startIndex + index) % array.length]);
}
function getNextMatch(values, search, currentMatch) {
  const isRepeated = search.length > 1 && Array.from(search).every((char) => char === search[0]);
  const normalizedSearch = isRepeated ? search[0] : search;
  const currentMatchIndex = currentMatch ? values.indexOf(currentMatch) : -1;
  let wrappedValues = wrapArray(values, Math.max(currentMatchIndex, 0));
  const excludeCurrentMatch = normalizedSearch.length === 1;
  if (excludeCurrentMatch) wrappedValues = wrappedValues.filter((v) => v !== currentMatch);
  const nextMatch = wrappedValues.find((value) => value.toLowerCase().startsWith(normalizedSearch.toLowerCase()));
  return nextMatch !== currentMatch ? nextMatch : void 0;
}
function usePointerDownOutside(onPointerDownOutside, element, enabled = true) {
  element?.value?.ownerDocument ?? globalThis?.document;
  const isPointerInsideDOMTree = vueExports.ref(false);
  vueExports.ref(() => {
  });
  vueExports.watchEffect((cleanupFn) => {
    return;
  });
  return { onPointerDownCapture: () => {
    if (!vueExports.toValue(enabled)) return;
    isPointerInsideDOMTree.value = true;
  } };
}
function useFocusOutside(onFocusOutside, element, enabled = true) {
  element?.value?.ownerDocument ?? globalThis?.document;
  const isFocusInsideDOMTree = vueExports.ref(false);
  vueExports.watchEffect((cleanupFn) => {
    return;
  });
  return {
    onFocusCapture: () => {
      if (!vueExports.toValue(enabled)) return;
      isFocusInsideDOMTree.value = true;
    },
    onBlurCapture: () => {
      if (!vueExports.toValue(enabled)) return;
      isFocusInsideDOMTree.value = false;
    }
  };
}
const context = /* @__PURE__ */ vueExports.reactive({
  layersRoot: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  originalBodyPointerEvents: void 0,
  branches: /* @__PURE__ */ new Set()
});
var DismissableLayer_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "DismissableLayer",
  props: {
    disableOutsidePointerEvents: {
      type: Boolean,
      required: false,
      default: false
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false
    }
  },
  emits: [
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside",
    "dismiss"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { forwardRef, currentElement: layerElement } = useForwardExpose();
    const ownerDocument = vueExports.computed(() => layerElement.value?.ownerDocument ?? globalThis.document);
    const layers = vueExports.computed(() => context.layersRoot);
    const index = vueExports.computed(() => {
      return layerElement.value ? Array.from(layers.value).indexOf(layerElement.value) : -1;
    });
    const isBodyPointerEventsDisabled = vueExports.computed(() => {
      return context.layersWithOutsidePointerEventsDisabled.size > 0;
    });
    const isPointerEventsEnabled = vueExports.computed(() => {
      const localLayers = Array.from(layers.value);
      const [highestLayerWithOutsidePointerEventsDisabled] = [...context.layersWithOutsidePointerEventsDisabled].slice(-1);
      const highestLayerWithOutsidePointerEventsDisabledIndex = localLayers.indexOf(highestLayerWithOutsidePointerEventsDisabled);
      return index.value >= highestLayerWithOutsidePointerEventsDisabledIndex;
    });
    const pointerDownOutside = usePointerDownOutside(async (event) => {
      const isPointerDownOnBranch = [...context.branches].some((branch) => branch?.contains(event.target));
      if (!isPointerEventsEnabled.value || isPointerDownOnBranch) return;
      emits("pointerDownOutside", event);
      emits("interactOutside", event);
      await vueExports.nextTick();
      if (!event.defaultPrevented) emits("dismiss");
    }, layerElement);
    const focusOutside = useFocusOutside((event) => {
      const isFocusInBranch = [...context.branches].some((branch) => branch?.contains(event.target));
      if (isFocusInBranch) return;
      emits("focusOutside", event);
      emits("interactOutside", event);
      if (!event.defaultPrevented) emits("dismiss");
    }, layerElement);
    onKeyStroke("Escape", (event) => {
      const isHighestLayer = index.value === layers.value.size - 1;
      if (!isHighestLayer) return;
      emits("escapeKeyDown", event);
      if (!event.defaultPrevented) emits("dismiss");
    });
    vueExports.watchEffect((cleanupFn) => {
      if (!layerElement.value) return;
      if (props.disableOutsidePointerEvents) {
        if (context.layersWithOutsidePointerEventsDisabled.size === 0) {
          context.originalBodyPointerEvents = ownerDocument.value.body.style.pointerEvents;
          ownerDocument.value.body.style.pointerEvents = "none";
        }
        context.layersWithOutsidePointerEventsDisabled.add(layerElement.value);
      }
      layers.value.add(layerElement.value);
      cleanupFn(() => {
        if (props.disableOutsidePointerEvents && context.layersWithOutsidePointerEventsDisabled.size === 1 && !isNullish(context.originalBodyPointerEvents)) ownerDocument.value.body.style.pointerEvents = context.originalBodyPointerEvents;
      });
    });
    vueExports.watchEffect((cleanupFn) => {
      cleanupFn(() => {
        if (!layerElement.value) return;
        layers.value.delete(layerElement.value);
        context.layersWithOutsidePointerEventsDisabled.delete(layerElement.value);
      });
    });
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), {
        ref: vueExports.unref(forwardRef),
        "as-child": _ctx.asChild,
        as: _ctx.as,
        "data-dismissable-layer": "",
        style: vueExports.normalizeStyle({ pointerEvents: isBodyPointerEventsDisabled.value ? isPointerEventsEnabled.value ? "auto" : "none" : void 0 }),
        onFocusCapture: vueExports.unref(focusOutside).onFocusCapture,
        onBlurCapture: vueExports.unref(focusOutside).onBlurCapture,
        onPointerdownCapture: vueExports.unref(pointerDownOutside).onPointerDownCapture
      }, {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 8, [
        "as-child",
        "as",
        "style",
        "onFocusCapture",
        "onBlurCapture",
        "onPointerdownCapture"
      ]);
    };
  }
});
var DismissableLayer_default = DismissableLayer_vue_vue_type_script_setup_true_lang_default;
const useFocusStackState = createGlobalState(() => {
  const stack = vueExports.ref([]);
  return stack;
});
function createFocusScopesStack() {
  const stack = useFocusStackState();
  return {
    add(focusScope) {
      const activeFocusScope = stack.value[0];
      if (focusScope !== activeFocusScope) activeFocusScope?.pause();
      stack.value = arrayRemove(stack.value, focusScope);
      stack.value.unshift(focusScope);
    },
    remove(focusScope) {
      stack.value = arrayRemove(stack.value, focusScope);
      stack.value[0]?.resume();
    }
  };
}
function arrayRemove(array, item) {
  const updatedArray = [...array];
  const index = updatedArray.indexOf(item);
  if (index !== -1) updatedArray.splice(index, 1);
  return updatedArray;
}
var FocusScope_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "FocusScope",
  props: {
    loop: {
      type: Boolean,
      required: false,
      default: false
    },
    trapped: {
      type: Boolean,
      required: false,
      default: false
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false
    }
  },
  emits: ["mountAutoFocus", "unmountAutoFocus"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { currentRef, currentElement } = useForwardExpose();
    vueExports.ref(null);
    const focusScopesStack = createFocusScopesStack();
    const focusScope = /* @__PURE__ */ vueExports.reactive({
      paused: false,
      pause() {
        this.paused = true;
      },
      resume() {
        this.paused = false;
      }
    });
    vueExports.watchEffect((cleanupFn) => {
      return;
    });
    vueExports.watchEffect(async (cleanupFn) => {
      const container = currentElement.value;
      await vueExports.nextTick();
      if (!container) return;
      focusScopesStack.add(focusScope);
      const previouslyFocusedElement = getActiveElement();
      const hasFocusedCandidate = container.contains(previouslyFocusedElement);
      if (!hasFocusedCandidate) {
        const mountEvent = new CustomEvent(AUTOFOCUS_ON_MOUNT, EVENT_OPTIONS);
        container.addEventListener(AUTOFOCUS_ON_MOUNT, (ev) => emits("mountAutoFocus", ev));
        container.dispatchEvent(mountEvent);
        if (!mountEvent.defaultPrevented) {
          focusFirst$1(getTabbableCandidates(container), { select: true });
          if (getActiveElement() === previouslyFocusedElement) focus(container);
        }
      }
      cleanupFn(() => {
        container.removeEventListener(AUTOFOCUS_ON_MOUNT, (ev) => emits("mountAutoFocus", ev));
        const unmountEvent = new CustomEvent(AUTOFOCUS_ON_UNMOUNT, EVENT_OPTIONS);
        const unmountEventHandler = (ev) => {
          emits("unmountAutoFocus", ev);
        };
        container.addEventListener(AUTOFOCUS_ON_UNMOUNT, unmountEventHandler);
        container.dispatchEvent(unmountEvent);
        setTimeout(() => {
          if (!unmountEvent.defaultPrevented) focus(previouslyFocusedElement ?? (void 0).body, { select: true });
          container.removeEventListener(AUTOFOCUS_ON_UNMOUNT, unmountEventHandler);
          focusScopesStack.remove(focusScope);
        }, 0);
      });
    });
    function handleKeyDown(event) {
      if (!props.loop && !props.trapped) return;
      if (focusScope.paused) return;
      const isTabKey = event.key === "Tab" && !event.altKey && !event.ctrlKey && !event.metaKey;
      const focusedElement = getActiveElement();
      if (isTabKey && focusedElement) {
        const container = event.currentTarget;
        const [first, last] = getTabbableEdges(container);
        const hasTabbableElementsInside = first && last;
        if (!hasTabbableElementsInside) {
          if (focusedElement === container) event.preventDefault();
        } else if (!event.shiftKey && focusedElement === last) {
          event.preventDefault();
          if (props.loop) focus(first, { select: true });
        } else if (event.shiftKey && focusedElement === first) {
          event.preventDefault();
          if (props.loop) focus(last, { select: true });
        }
      }
    }
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), {
        ref_key: "currentRef",
        ref: currentRef,
        tabindex: "-1",
        "as-child": _ctx.asChild,
        as: _ctx.as,
        onKeydown: handleKeyDown
      }, {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 8, ["as-child", "as"]);
    };
  }
});
var FocusScope_default = FocusScope_vue_vue_type_script_setup_true_lang_default;
function focusFirst(candidates) {
  const PREVIOUSLY_FOCUSED_ELEMENT = getActiveElement();
  for (const candidate of candidates) {
    if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
    candidate.focus();
    if (getActiveElement() !== PREVIOUSLY_FOCUSED_ELEMENT) return;
  }
}
const [injectPopperRootContext, providePopperRootContext] = /* @__PURE__ */ createContext("PopperRoot");
var PopperRoot_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  inheritAttrs: false,
  __name: "PopperRoot",
  setup(__props) {
    const anchor = vueExports.ref();
    providePopperRootContext({
      anchor,
      onAnchorChange: (element) => anchor.value = element
    });
    return (_ctx, _cache) => {
      return vueExports.renderSlot(_ctx.$slots, "default");
    };
  }
});
var PopperRoot_default = PopperRoot_vue_vue_type_script_setup_true_lang_default;
var PopperAnchor_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "PopperAnchor",
  props: {
    reference: {
      type: null,
      required: false
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false
    }
  },
  setup(__props) {
    const props = __props;
    const { forwardRef, currentElement } = useForwardExpose();
    const rootContext = injectPopperRootContext();
    vueExports.watchPostEffect(() => {
      rootContext.onAnchorChange(props.reference ?? currentElement.value);
    });
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), {
        ref: vueExports.unref(forwardRef),
        as: _ctx.as,
        "as-child": _ctx.asChild
      }, {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 8, ["as", "as-child"]);
    };
  }
});
var PopperAnchor_default = PopperAnchor_vue_vue_type_script_setup_true_lang_default;
const _hoisted_1$2 = {
  key: 0,
  d: "M0 0L6 6L12 0"
};
const _hoisted_2 = {
  key: 1,
  d: "M0 0L4.58579 4.58579C5.36683 5.36683 6.63316 5.36684 7.41421 4.58579L12 0"
};
var Arrow_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "Arrow",
  props: {
    width: {
      type: Number,
      required: false,
      default: 10
    },
    height: {
      type: Number,
      required: false,
      default: 5
    },
    rounded: {
      type: Boolean,
      required: false
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false,
      default: "svg"
    }
  },
  setup(__props) {
    const props = __props;
    useForwardExpose();
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), vueExports.mergeProps(props, {
        width: _ctx.width,
        height: _ctx.height,
        viewBox: _ctx.asChild ? void 0 : "0 0 12 6",
        preserveAspectRatio: _ctx.asChild ? void 0 : "none"
      }), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default", {}, () => [!_ctx.rounded ? (vueExports.openBlock(), vueExports.createElementBlock("path", _hoisted_1$2)) : (vueExports.openBlock(), vueExports.createElementBlock("path", _hoisted_2))])]),
        _: 3
      }, 16, [
        "width",
        "height",
        "viewBox",
        "preserveAspectRatio"
      ]);
    };
  }
});
var Arrow_default = Arrow_vue_vue_type_script_setup_true_lang_default;
function isNotNull(value) {
  return value !== null;
}
function transformOrigin(options) {
  return {
    name: "transformOrigin",
    options,
    fn(data) {
      const { placement, rects, middlewareData } = data;
      const cannotCenterArrow = middlewareData.arrow?.centerOffset !== 0;
      const isArrowHidden = cannotCenterArrow;
      const arrowWidth = isArrowHidden ? 0 : options.arrowWidth;
      const arrowHeight = isArrowHidden ? 0 : options.arrowHeight;
      const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement);
      const noArrowAlign = {
        start: "0%",
        center: "50%",
        end: "100%"
      }[placedAlign];
      const arrowXCenter = (middlewareData.arrow?.x ?? 0) + arrowWidth / 2;
      const arrowYCenter = (middlewareData.arrow?.y ?? 0) + arrowHeight / 2;
      let x = "";
      let y = "";
      if (placedSide === "bottom") {
        x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
        y = `${-arrowHeight}px`;
      } else if (placedSide === "top") {
        x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
        y = `${rects.floating.height + arrowHeight}px`;
      } else if (placedSide === "right") {
        x = `${-arrowHeight}px`;
        y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
      } else if (placedSide === "left") {
        x = `${rects.floating.width + arrowHeight}px`;
        y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
      }
      return { data: {
        x,
        y
      } };
    }
  };
}
function getSideAndAlignFromPlacement(placement) {
  const [side, align = "center"] = placement.split("-");
  return [side, align];
}
const sides = ["top", "right", "bottom", "left"];
const min = Math.min;
const max = Math.max;
const round = Math.round;
const floor = Math.floor;
const createCoords = (v) => ({
  x: v,
  y: v
});
const oppositeSideMap = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function clamp(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getOppositeAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
  return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
  const firstChar = placement[0];
  return firstChar === "t" || firstChar === "b" ? "y" : "x";
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.includes("start") ? placement.replace("start", "end") : placement.replace("end", "start");
}
const lrPlacement = ["left", "right"];
const rlPlacement = ["right", "left"];
const tbPlacement = ["top", "bottom"];
const btPlacement = ["bottom", "top"];
function getSideList(side, isStart, rtl) {
  switch (side) {
    case "top":
    case "bottom":
      if (rtl) return isStart ? rlPlacement : lrPlacement;
      return isStart ? lrPlacement : rlPlacement;
    case "left":
    case "right":
      return isStart ? tbPlacement : btPlacement;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === "start", rtl);
  if (alignment) {
    list = list.map((side) => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  const side = getSide(placement);
  return oppositeSideMap[side] + placement.slice(side.length);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x,
    y,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    x,
    y
  };
}
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === "y";
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case "start":
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case "end":
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x,
    y,
    platform: platform2,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
    element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === "floating" ? {
    x,
    y,
    width: rects.floating.width,
    height: rects.floating.height
  } : rects.reference;
  const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
  const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}
const MAX_RESET_COUNT = 50;
const computePosition$1 = async (reference, floating, config) => {
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2
  } = config;
  const platformWithDetectOverflow = platform2.detectOverflow ? platform2 : {
    ...platform2,
    detectOverflow
  };
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
  let rects = await platform2.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let resetCount = 0;
  const middlewareData = {};
  for (let i = 0; i < middleware.length; i++) {
    const currentMiddleware = middleware[i];
    if (!currentMiddleware) {
      continue;
    }
    const {
      name,
      fn
    } = currentMiddleware;
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platformWithDetectOverflow,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData[name] = {
      ...middlewareData[name],
      ...data
    };
    if (reset && resetCount < MAX_RESET_COUNT) {
      resetCount++;
      if (typeof reset === "object") {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform2.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};
const arrow$2 = (options) => ({
  name: "arrow",
  options,
  async fn(state) {
    const {
      x,
      y,
      placement,
      rects,
      platform: platform2,
      elements,
      middlewareData
    } = state;
    const {
      element,
      padding = 0
    } = evaluate(options, state) || {};
    if (element == null) {
      return {};
    }
    const paddingObject = getPaddingObject(padding);
    const coords = {
      x,
      y
    };
    const axis = getAlignmentAxis(placement);
    const length = getAxisLength(axis);
    const arrowDimensions = await platform2.getDimensions(element);
    const isYAxis = axis === "y";
    const minProp = isYAxis ? "top" : "left";
    const maxProp = isYAxis ? "bottom" : "right";
    const clientProp = isYAxis ? "clientHeight" : "clientWidth";
    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
    const startDiff = coords[axis] - rects.reference[axis];
    const arrowOffsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(element));
    let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
    if (!clientSize || !await (platform2.isElement == null ? void 0 : platform2.isElement(arrowOffsetParent))) {
      clientSize = elements.floating[clientProp] || rects.floating[length];
    }
    const centerToReference = endDiff / 2 - startDiff / 2;
    const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
    const minPadding = min(paddingObject[minProp], largestPossiblePadding);
    const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
    const min$1 = minPadding;
    const max2 = clientSize - arrowDimensions[length] - maxPadding;
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset2 = clamp(min$1, center, max2);
    const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset2 && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
    const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max2 : 0;
    return {
      [axis]: coords[axis] + alignmentOffset,
      data: {
        [axis]: offset2,
        centerOffset: center - offset2 - alignmentOffset,
        ...shouldAddOffset && {
          alignmentOffset
        }
      },
      reset: shouldAddOffset
    };
  }
});
const flip$1 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "flip",
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform: platform2,
        elements
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = "bestFit",
        fallbackAxisSideDirection = "none",
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      const side = getSide(placement);
      const initialSideAxis = getSideAxis(initialPlacement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
      if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements2 = [initialPlacement, ...fallbackPlacements];
      const overflow = await platform2.detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides2 = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides2[0]], overflow[sides2[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];
      if (!overflows.every((side2) => side2 <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements2[nextIndex];
        if (nextPlacement) {
          const ignoreCrossAxisOverflow = checkCrossAxis === "alignment" ? initialSideAxis !== getSideAxis(nextPlacement) : false;
          if (!ignoreCrossAxisOverflow || // We leave the current main axis only if every placement on that axis
          // overflows the main axis.
          overflowsData.every((d) => getSideAxis(d.placement) === initialSideAxis ? d.overflows[0] > 0 : true)) {
            return {
              data: {
                index: nextIndex,
                overflows: overflowsData
              },
              reset: {
                placement: nextPlacement
              }
            };
          }
        }
        let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case "bestFit": {
              var _overflowsData$filter2;
              const placement2 = (_overflowsData$filter2 = overflowsData.filter((d) => {
                if (hasFallbackAxisSideDirection) {
                  const currentSideAxis = getSideAxis(d.placement);
                  return currentSideAxis === initialSideAxis || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  currentSideAxis === "y";
                }
                return true;
              }).map((d) => [d.placement, d.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
              if (placement2) {
                resetPlacement = placement2;
              }
              break;
            }
            case "initialPlacement":
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};
function getSideOffsets(overflow, rect) {
  return {
    top: overflow.top - rect.height,
    right: overflow.right - rect.width,
    bottom: overflow.bottom - rect.height,
    left: overflow.left - rect.width
  };
}
function isAnySideFullyClipped(overflow) {
  return sides.some((side) => overflow[side] >= 0);
}
const hide$1 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "hide",
    options,
    async fn(state) {
      const {
        rects,
        platform: platform2
      } = state;
      const {
        strategy = "referenceHidden",
        ...detectOverflowOptions
      } = evaluate(options, state);
      switch (strategy) {
        case "referenceHidden": {
          const overflow = await platform2.detectOverflow(state, {
            ...detectOverflowOptions,
            elementContext: "reference"
          });
          const offsets = getSideOffsets(overflow, rects.reference);
          return {
            data: {
              referenceHiddenOffsets: offsets,
              referenceHidden: isAnySideFullyClipped(offsets)
            }
          };
        }
        case "escaped": {
          const overflow = await platform2.detectOverflow(state, {
            ...detectOverflowOptions,
            altBoundary: true
          });
          const offsets = getSideOffsets(overflow, rects.floating);
          return {
            data: {
              escapedOffsets: offsets,
              escaped: isAnySideFullyClipped(offsets)
            }
          };
        }
        default: {
          return {};
        }
      }
    }
  };
};
const originSides = /* @__PURE__ */ new Set(["left", "top"]);
async function convertValueToCoords(state, options) {
  const {
    placement,
    platform: platform2,
    elements
  } = state;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === "y";
  const mainAxisMulti = originSides.has(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === "number" ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: rawValue.mainAxis || 0,
    crossAxis: rawValue.crossAxis || 0,
    alignmentAxis: rawValue.alignmentAxis
  };
  if (alignment && typeof alignmentAxis === "number") {
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
const offset$1 = function(options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: "offset",
    options,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow;
      const {
        x,
        y,
        placement,
        middlewareData
      } = state;
      const diffCoords = await convertValueToCoords(state, options);
      if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: {
          ...diffCoords,
          placement
        }
      };
    }
  };
};
const shift$1 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "shift",
    options,
    async fn(state) {
      const {
        x,
        y,
        placement,
        platform: platform2
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: (_ref) => {
            let {
              x: x2,
              y: y2
            } = _ref;
            return {
              x: x2,
              y: y2
            };
          }
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const coords = {
        x,
        y
      };
      const overflow = await platform2.detectOverflow(state, detectOverflowOptions);
      const crossAxis = getSideAxis(getSide(placement));
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === "y" ? "top" : "left";
        const maxSide = mainAxis === "y" ? "bottom" : "right";
        const min2 = mainAxisCoord + overflow[minSide];
        const max2 = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = clamp(min2, mainAxisCoord, max2);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === "y" ? "top" : "left";
        const maxSide = crossAxis === "y" ? "bottom" : "right";
        const min2 = crossAxisCoord + overflow[minSide];
        const max2 = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = clamp(min2, crossAxisCoord, max2);
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x,
          y: limitedCoords.y - y,
          enabled: {
            [mainAxis]: checkMainAxis,
            [crossAxis]: checkCrossAxis
          }
        }
      };
    }
  };
};
const limitShift$1 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    options,
    fn(state) {
      const {
        x,
        y,
        placement,
        rects,
        middlewareData
      } = state;
      const {
        offset: offset2 = 0,
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true
      } = evaluate(options, state);
      const coords = {
        x,
        y
      };
      const crossAxis = getSideAxis(placement);
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      const rawOffset = evaluate(offset2, state);
      const computedOffset = typeof rawOffset === "number" ? {
        mainAxis: rawOffset,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...rawOffset
      };
      if (checkMainAxis) {
        const len = mainAxis === "y" ? "height" : "width";
        const limitMin = rects.reference[mainAxis] - rects.floating[len] + computedOffset.mainAxis;
        const limitMax = rects.reference[mainAxis] + rects.reference[len] - computedOffset.mainAxis;
        if (mainAxisCoord < limitMin) {
          mainAxisCoord = limitMin;
        } else if (mainAxisCoord > limitMax) {
          mainAxisCoord = limitMax;
        }
      }
      if (checkCrossAxis) {
        var _middlewareData$offse, _middlewareData$offse2;
        const len = mainAxis === "y" ? "width" : "height";
        const isOriginSide = originSides.has(getSide(placement));
        const limitMin = rects.reference[crossAxis] - rects.floating[len] + (isOriginSide ? ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse[crossAxis]) || 0 : 0) + (isOriginSide ? 0 : computedOffset.crossAxis);
        const limitMax = rects.reference[crossAxis] + rects.reference[len] + (isOriginSide ? 0 : ((_middlewareData$offse2 = middlewareData.offset) == null ? void 0 : _middlewareData$offse2[crossAxis]) || 0) - (isOriginSide ? computedOffset.crossAxis : 0);
        if (crossAxisCoord < limitMin) {
          crossAxisCoord = limitMin;
        } else if (crossAxisCoord > limitMax) {
          crossAxisCoord = limitMax;
        }
      }
      return {
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      };
    }
  };
};
const size$1 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "size",
    options,
    async fn(state) {
      var _state$middlewareData, _state$middlewareData2;
      const {
        placement,
        rects,
        platform: platform2,
        elements
      } = state;
      const {
        apply = () => {
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const overflow = await platform2.detectOverflow(state, detectOverflowOptions);
      const side = getSide(placement);
      const alignment = getAlignment(placement);
      const isYAxis = getSideAxis(placement) === "y";
      const {
        width,
        height
      } = rects.floating;
      let heightSide;
      let widthSide;
      if (side === "top" || side === "bottom") {
        heightSide = side;
        widthSide = alignment === (await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
      } else {
        widthSide = side;
        heightSide = alignment === "end" ? "top" : "bottom";
      }
      const maximumClippingHeight = height - overflow.top - overflow.bottom;
      const maximumClippingWidth = width - overflow.left - overflow.right;
      const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight);
      const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth);
      const noShift = !state.middlewareData.shift;
      let availableHeight = overflowAvailableHeight;
      let availableWidth = overflowAvailableWidth;
      if ((_state$middlewareData = state.middlewareData.shift) != null && _state$middlewareData.enabled.x) {
        availableWidth = maximumClippingWidth;
      }
      if ((_state$middlewareData2 = state.middlewareData.shift) != null && _state$middlewareData2.enabled.y) {
        availableHeight = maximumClippingHeight;
      }
      if (noShift && !alignment) {
        const xMin = max(overflow.left, 0);
        const xMax = max(overflow.right, 0);
        const yMin = max(overflow.top, 0);
        const yMax = max(overflow.bottom, 0);
        if (isYAxis) {
          availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
        } else {
          availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
        }
      }
      await apply({
        ...state,
        availableWidth,
        availableHeight
      });
      const nextDimensions = await platform2.getDimensions(elements.floating);
      if (width !== nextDimensions.width || height !== nextDimensions.height) {
        return {
          reset: {
            rects: true
          }
        };
      }
      return {};
    }
  };
};
function getNodeName(node) {
  if (isNode()) {
    return (node.nodeName || "").toLowerCase();
  }
  return "#document";
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || void 0;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode() ? node.ownerDocument : node.document) || (void 0).document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  {
    return false;
  }
}
function isElement(value) {
  {
    return false;
  }
}
function isHTMLElement(value) {
  {
    return false;
  }
}
function isShadowRoot(value) {
  {
    return false;
  }
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle$1(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && display !== "inline" && display !== "contents";
}
function isTableElement(element) {
  return /^(table|td|th)$/.test(getNodeName(element));
}
function isTopLayer(element) {
  try {
    if (element.matches(":popover-open")) {
      return true;
    }
  } catch (_e) {
  }
  try {
    return element.matches(":modal");
  } catch (_e) {
    return false;
  }
}
const willChangeRe = /transform|translate|scale|rotate|perspective|filter/;
const containRe = /paint|layout|strict|content/;
const isNotNone = (value) => !!value && value !== "none";
let isWebKitValue;
function isContainingBlock(elementOrCss) {
  const css = isElement() ? getComputedStyle$1(elementOrCss) : elementOrCss;
  return isNotNone(css.transform) || isNotNone(css.translate) || isNotNone(css.scale) || isNotNone(css.rotate) || isNotNone(css.perspective) || !isWebKit() && (isNotNone(css.backdropFilter) || isNotNone(css.filter)) || willChangeRe.test(css.willChange || "") || containRe.test(css.contain || "");
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement() && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else if (isTopLayer(currentNode)) {
      return null;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (isWebKitValue == null) {
    isWebKitValue = typeof CSS !== "undefined" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none");
  }
  return isWebKitValue;
}
function isLastTraversableNode(node) {
  return /^(html|body|#document)$/.test(getNodeName(node));
}
function getComputedStyle$1(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement()) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  const result = (
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    isShadowRoot() && node.host || // Fallback.
    getDocumentElement(node)
  );
  return isShadowRoot() ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement() && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    const frameElement = getFrameElement(win);
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
  } else {
    return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
  }
}
function getFrameElement(win) {
  return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}
function getCssDimensions(element) {
  const css = getComputedStyle$1(element);
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement();
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}
function unwrapElement$1(element) {
  return !isElement() ? element.contextElement : element;
}
function getScale(element) {
  const domElement = unwrapElement$1(element);
  if (!isHTMLElement()) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x = ($ ? round(rect.width) : rect.width) / width;
  let y = ($ ? round(rect.height) : rect.height) / height;
  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}
const noOffsets = /* @__PURE__ */ createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
    return false;
  }
  return isFixed;
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement$1(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement()) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement() ? getWindow(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = getFrameElement(currentWin);
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle$1(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentWin = getWindow(currentIFrame);
      currentIFrame = getFrameElement(currentWin);
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y
  });
}
function getWindowScrollBarX(element, rect) {
  const leftScroll = getNodeScroll(element).scrollLeft;
  if (!rect) {
    return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
  }
  return rect.left + leftScroll;
}
function getHTMLOffset(documentElement, scroll) {
  const htmlRect = documentElement.getBoundingClientRect();
  const x = htmlRect.left + scroll.scrollLeft - getWindowScrollBarX(documentElement, htmlRect);
  const y = htmlRect.top + scroll.scrollTop;
  return {
    x,
    y
  };
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === "fixed";
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement();
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
  };
}
function getClientRects(element) {
  return Array.from(element.getClientRects());
}
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle$1(body).direction === "rtl") {
    x += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}
const SCROLLBAR_MAX = 25;
function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  const windowScrollbarX = getWindowScrollBarX(html);
  if (windowScrollbarX <= 0) {
    const doc = html.ownerDocument;
    const body = doc.body;
    const bodyStyles = getComputedStyle(body);
    const bodyMarginInline = doc.compatMode === "CSS1Compat" ? parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight) || 0 : 0;
    const clippingStableScrollbarWidth = Math.abs(html.clientWidth - body.clientWidth - bodyMarginInline);
    if (clippingStableScrollbarWidth <= SCROLLBAR_MAX) {
      width -= clippingStableScrollbarWidth;
    }
  } else if (windowScrollbarX <= SCROLLBAR_MAX) {
    width += windowScrollbarX;
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement() ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x,
    y
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === "viewport") {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === "document") {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement()) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y,
      width: clippingAncestor.width,
      height: clippingAncestor.height
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement() || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle$1(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
}
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter((el) => isElement() && getNodeName(el) !== "body");
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle$1(element).position === "fixed";
  let currentNode = elementIsFixed ? getParentNode(element) : element;
  while (isElement() && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle$1(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === "fixed") {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && (currentContainingBlockComputedStyle.position === "absolute" || currentContainingBlockComputedStyle.position === "fixed") || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      result = result.filter((ancestor) => ancestor !== currentNode);
    } else {
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstRect = getClientRectFromClippingAncestor(element, clippingAncestors[0], strategy);
  let top = firstRect.top;
  let right = firstRect.right;
  let bottom = firstRect.bottom;
  let left = firstRect.left;
  for (let i = 1; i < clippingAncestors.length; i++) {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestors[i], strategy);
    top = max(rect.top, top);
    right = min(rect.right, right);
    bottom = min(rect.bottom, bottom);
    left = max(rect.left, left);
  }
  return {
    width: right - left,
    height: bottom - top,
    x: left,
    y: top
  };
}
function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement();
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === "fixed";
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  function setLeftRTLScrollbarOffset() {
    offsets.x = getWindowScrollBarX(documentElement);
  }
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      setLeftRTLScrollbarOffset();
    }
  }
  if (isFixed && !isOffsetParentAnElement && documentElement) {
    setLeftRTLScrollbarOffset();
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  const x = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
  const y = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
  return {
    x,
    y,
    width: rect.width,
    height: rect.height
  };
}
function isStaticPositioned(element) {
  return getComputedStyle$1(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement() || getComputedStyle$1(element).position === "fixed") {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  let rawOffsetParent = element.offsetParent;
  if (getDocumentElement(element) === rawOffsetParent) {
    rawOffsetParent = rawOffsetParent.ownerDocument.body;
  }
  return rawOffsetParent;
}
function getOffsetParent(element, polyfill) {
  const win = getWindow(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement()) {
    let svgOffsetParent = getParentNode(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement() && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}
const getElementRects = async function(data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  const floatingDimensions = await getDimensionsFn(data.floating);
  return {
    reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height
    }
  };
};
function isRTL(element) {
  return getComputedStyle$1(element).direction === "rtl";
}
const platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL
};
function rectsAreEqual(a, b) {
  return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
}
function observeMove(element, onMove) {
  let io = null;
  let timeoutId;
  const root = getDocumentElement(element);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const elementRectForRootMargin = element.getBoundingClientRect();
    const {
      left,
      top,
      width,
      height
    } = elementRectForRootMargin;
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1e3);
        } else {
          refresh(false, ratio);
        }
      }
      if (ratio === 1 && !rectsAreEqual(elementRectForRootMargin, element.getBoundingClientRect())) {
        refresh();
      }
      isFirstUpdate = false;
    }
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument
      });
    } catch (_e) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === "function",
    layoutShift = typeof IntersectionObserver === "function",
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement$1(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...floating ? getOverflowAncestors(floating) : []] : [];
  ancestors.forEach((ancestor) => {
    ancestorScroll && ancestor.addEventListener("scroll", update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener("resize", update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver((_ref) => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver && floating) {
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    if (floating) {
      resizeObserver.observe(floating);
    }
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _resizeObserver2;
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener("scroll", update);
      ancestorResize && ancestor.removeEventListener("resize", update);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
const offset = offset$1;
const shift = shift$1;
const flip = flip$1;
const size = size$1;
const hide = hide$1;
const arrow$1 = arrow$2;
const limitShift = limitShift$1;
const computePosition = (reference, floating, options) => {
  const cache = /* @__PURE__ */ new Map();
  const mergedOptions = {
    platform,
    ...options
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache
  };
  return computePosition$1(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};
function isComponentPublicInstance(target) {
  return target != null && typeof target === "object" && "$el" in target;
}
function unwrapElement(target) {
  if (isComponentPublicInstance(target)) {
    const element = target.$el;
    return isNode() && getNodeName(element) === "#comment" ? null : element;
  }
  return target;
}
function toValue(source) {
  return typeof source === "function" ? source() : vueExports.unref(source);
}
function arrow(options) {
  return {
    name: "arrow",
    options,
    fn(args) {
      const element = unwrapElement(toValue(options.element));
      if (element == null) {
        return {};
      }
      return arrow$1({
        element,
        padding: options.padding
      }).fn(args);
    }
  };
}
function getDPR(element) {
  {
    return 1;
  }
}
function roundByDPR(element, value) {
  const dpr = getDPR();
  return Math.round(value * dpr) / dpr;
}
function useFloating(reference, floating, options) {
  if (options === void 0) {
    options = {};
  }
  const whileElementsMountedOption = options.whileElementsMounted;
  const openOption = vueExports.computed(() => {
    var _toValue;
    return (_toValue = toValue(options.open)) != null ? _toValue : true;
  });
  const middlewareOption = vueExports.computed(() => toValue(options.middleware));
  const placementOption = vueExports.computed(() => {
    var _toValue2;
    return (_toValue2 = toValue(options.placement)) != null ? _toValue2 : "bottom";
  });
  const strategyOption = vueExports.computed(() => {
    var _toValue3;
    return (_toValue3 = toValue(options.strategy)) != null ? _toValue3 : "absolute";
  });
  const transformOption = vueExports.computed(() => {
    var _toValue4;
    return (_toValue4 = toValue(options.transform)) != null ? _toValue4 : true;
  });
  const referenceElement = vueExports.computed(() => unwrapElement(reference.value));
  const floatingElement = vueExports.computed(() => unwrapElement(floating.value));
  const x = vueExports.ref(0);
  const y = vueExports.ref(0);
  const strategy = vueExports.ref(strategyOption.value);
  const placement = vueExports.ref(placementOption.value);
  const middlewareData = vueExports.shallowRef({});
  const isPositioned = vueExports.ref(false);
  const floatingStyles = vueExports.computed(() => {
    const initialStyles = {
      position: strategy.value,
      left: "0",
      top: "0"
    };
    if (!floatingElement.value) {
      return initialStyles;
    }
    const xVal = roundByDPR(floatingElement.value, x.value);
    const yVal = roundByDPR(floatingElement.value, y.value);
    if (transformOption.value) {
      return {
        ...initialStyles,
        transform: "translate(" + xVal + "px, " + yVal + "px)",
        ...getDPR(floatingElement.value) >= 1.5 && {
          willChange: "transform"
        }
      };
    }
    return {
      position: strategy.value,
      left: xVal + "px",
      top: yVal + "px"
    };
  });
  let whileElementsMountedCleanup;
  function update() {
    if (referenceElement.value == null || floatingElement.value == null) {
      return;
    }
    const open = openOption.value;
    computePosition(referenceElement.value, floatingElement.value, {
      middleware: middlewareOption.value,
      placement: placementOption.value,
      strategy: strategyOption.value
    }).then((position) => {
      x.value = position.x;
      y.value = position.y;
      strategy.value = position.strategy;
      placement.value = position.placement;
      middlewareData.value = position.middlewareData;
      isPositioned.value = open !== false;
    });
  }
  function cleanup() {
    if (typeof whileElementsMountedCleanup === "function") {
      whileElementsMountedCleanup();
      whileElementsMountedCleanup = void 0;
    }
  }
  function attach() {
    cleanup();
    if (whileElementsMountedOption === void 0) {
      update();
      return;
    }
    if (referenceElement.value != null && floatingElement.value != null) {
      whileElementsMountedCleanup = whileElementsMountedOption(referenceElement.value, floatingElement.value, update);
      return;
    }
  }
  function reset() {
    if (!openOption.value) {
      isPositioned.value = false;
    }
  }
  vueExports.watch([middlewareOption, placementOption, strategyOption, openOption], update, {
    flush: "sync"
  });
  vueExports.watch([referenceElement, floatingElement], attach, {
    flush: "sync"
  });
  vueExports.watch(openOption, reset, {
    flush: "sync"
  });
  if (vueExports.getCurrentScope()) {
    vueExports.onScopeDispose(cleanup);
  }
  return {
    x: vueExports.shallowReadonly(x),
    y: vueExports.shallowReadonly(y),
    strategy: vueExports.shallowReadonly(strategy),
    placement: vueExports.shallowReadonly(placement),
    middlewareData: vueExports.shallowReadonly(middlewareData),
    isPositioned: vueExports.shallowReadonly(isPositioned),
    floatingStyles,
    update
  };
}
const PopperContentPropsDefaultValue = {
  side: "bottom",
  sideOffset: 0,
  sideFlip: true,
  align: "center",
  alignOffset: 0,
  alignFlip: true,
  arrowPadding: 0,
  hideShiftedArrow: true,
  avoidCollisions: true,
  collisionBoundary: () => [],
  collisionPadding: 0,
  sticky: "partial",
  hideWhenDetached: false,
  positionStrategy: "fixed",
  updatePositionStrategy: "optimized",
  prioritizePosition: false
};
const [injectPopperContentContext, providePopperContentContext] = /* @__PURE__ */ createContext("PopperContent");
var PopperContent_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  inheritAttrs: false,
  __name: "PopperContent",
  props: /* @__PURE__ */ vueExports.mergeDefaults({
    side: {
      type: null,
      required: false
    },
    sideOffset: {
      type: Number,
      required: false
    },
    sideFlip: {
      type: Boolean,
      required: false
    },
    align: {
      type: null,
      required: false
    },
    alignOffset: {
      type: Number,
      required: false
    },
    alignFlip: {
      type: Boolean,
      required: false
    },
    avoidCollisions: {
      type: Boolean,
      required: false
    },
    collisionBoundary: {
      type: null,
      required: false
    },
    collisionPadding: {
      type: [Number, Object],
      required: false
    },
    arrowPadding: {
      type: Number,
      required: false
    },
    hideShiftedArrow: {
      type: Boolean,
      required: false
    },
    sticky: {
      type: String,
      required: false
    },
    hideWhenDetached: {
      type: Boolean,
      required: false
    },
    positionStrategy: {
      type: String,
      required: false
    },
    updatePositionStrategy: {
      type: String,
      required: false
    },
    disableUpdateOnLayoutShift: {
      type: Boolean,
      required: false
    },
    prioritizePosition: {
      type: Boolean,
      required: false
    },
    reference: {
      type: null,
      required: false
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false
    }
  }, { ...PopperContentPropsDefaultValue }),
  emits: ["placed"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const rootContext = injectPopperRootContext();
    const { forwardRef, currentElement: contentElement } = useForwardExpose();
    const floatingRef = vueExports.ref();
    const arrow$12 = vueExports.ref();
    const { width: arrowWidth, height: arrowHeight } = useSize();
    const desiredPlacement = vueExports.computed(() => props.side + (props.align !== "center" ? `-${props.align}` : ""));
    const collisionPadding = vueExports.computed(() => {
      return typeof props.collisionPadding === "number" ? props.collisionPadding : {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        ...props.collisionPadding
      };
    });
    const boundary = vueExports.computed(() => {
      return Array.isArray(props.collisionBoundary) ? props.collisionBoundary : [props.collisionBoundary];
    });
    const detectOverflowOptions = vueExports.computed(() => {
      return {
        padding: collisionPadding.value,
        boundary: boundary.value.filter(isNotNull),
        altBoundary: boundary.value.length > 0
      };
    });
    const flipOptions = vueExports.computed(() => {
      return {
        mainAxis: props.sideFlip,
        crossAxis: props.alignFlip
      };
    });
    const computedMiddleware = computedEager(() => {
      return [
        offset({
          mainAxis: props.sideOffset + arrowHeight.value,
          alignmentAxis: props.alignOffset
        }),
        props.prioritizePosition && props.avoidCollisions && flip({
          ...detectOverflowOptions.value,
          ...flipOptions.value
        }),
        props.avoidCollisions && shift({
          mainAxis: true,
          crossAxis: !!props.prioritizePosition,
          limiter: props.sticky === "partial" ? limitShift() : void 0,
          ...detectOverflowOptions.value
        }),
        !props.prioritizePosition && props.avoidCollisions && flip({
          ...detectOverflowOptions.value,
          ...flipOptions.value
        }),
        size({
          ...detectOverflowOptions.value,
          apply: ({ elements, rects, availableWidth, availableHeight }) => {
            const { width: anchorWidth, height: anchorHeight } = rects.reference;
            const contentStyle = elements.floating.style;
            contentStyle.setProperty("--reka-popper-available-width", `${availableWidth}px`);
            contentStyle.setProperty("--reka-popper-available-height", `${availableHeight}px`);
            contentStyle.setProperty("--reka-popper-anchor-width", `${anchorWidth}px`);
            contentStyle.setProperty("--reka-popper-anchor-height", `${anchorHeight}px`);
          }
        }),
        arrow$12.value && arrow({
          element: arrow$12.value,
          padding: props.arrowPadding
        }),
        transformOrigin({
          arrowWidth: arrowWidth.value,
          arrowHeight: arrowHeight.value
        }),
        props.hideWhenDetached && hide({
          strategy: "referenceHidden",
          ...detectOverflowOptions.value
        })
      ];
    });
    const reference = vueExports.computed(() => props.reference ?? rootContext.anchor.value);
    const { floatingStyles, placement, isPositioned, middlewareData } = useFloating(reference, floatingRef, {
      strategy: props.positionStrategy,
      placement: desiredPlacement,
      whileElementsMounted: (...args) => {
        const cleanup = autoUpdate(...args, {
          layoutShift: !props.disableUpdateOnLayoutShift,
          animationFrame: props.updatePositionStrategy === "always"
        });
        return cleanup;
      },
      middleware: computedMiddleware
    });
    const placedSide = vueExports.computed(() => getSideAndAlignFromPlacement(placement.value)[0]);
    const placedAlign = vueExports.computed(() => getSideAndAlignFromPlacement(placement.value)[1]);
    vueExports.watchPostEffect(() => {
      if (isPositioned.value) emits("placed");
    });
    const shouldHideArrow = vueExports.computed(() => {
      const cannotCenterArrow = middlewareData.value.arrow?.centerOffset !== 0;
      return props.hideShiftedArrow && cannotCenterArrow;
    });
    const contentZIndex = vueExports.ref("");
    vueExports.watchEffect(() => {
      if (contentElement.value) contentZIndex.value = (void 0).getComputedStyle(contentElement.value).zIndex;
    });
    const arrowX = vueExports.computed(() => middlewareData.value.arrow?.x ?? 0);
    const arrowY = vueExports.computed(() => middlewareData.value.arrow?.y ?? 0);
    providePopperContentContext({
      placedSide,
      onArrowChange: (element) => arrow$12.value = element,
      arrowX,
      arrowY,
      shouldHideArrow
    });
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createElementBlock("div", {
        ref_key: "floatingRef",
        ref: floatingRef,
        "data-reka-popper-content-wrapper": "",
        style: vueExports.normalizeStyle({
          ...vueExports.unref(floatingStyles),
          transform: vueExports.unref(isPositioned) ? vueExports.unref(floatingStyles).transform : "translate(0, -200%)",
          minWidth: "max-content",
          zIndex: contentZIndex.value,
          ["--reka-popper-transform-origin"]: [vueExports.unref(middlewareData).transformOrigin?.x, vueExports.unref(middlewareData).transformOrigin?.y].join(" "),
          ...vueExports.unref(middlewareData).hide?.referenceHidden && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        })
      }, [vueExports.createVNode(vueExports.unref(Primitive), vueExports.mergeProps({ ref: vueExports.unref(forwardRef) }, _ctx.$attrs, {
        "as-child": props.asChild,
        as: _ctx.as,
        "data-side": placedSide.value,
        "data-align": placedAlign.value,
        style: { animation: !vueExports.unref(isPositioned) ? "none" : void 0 }
      }), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16, [
        "as-child",
        "as",
        "data-side",
        "data-align",
        "style"
      ])], 4);
    };
  }
});
var PopperContent_default = PopperContent_vue_vue_type_script_setup_true_lang_default;
const OPPOSITE_SIDE = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
};
var PopperArrow_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  inheritAttrs: false,
  __name: "PopperArrow",
  props: {
    width: {
      type: Number,
      required: false
    },
    height: {
      type: Number,
      required: false
    },
    rounded: {
      type: Boolean,
      required: false
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false,
      default: "svg"
    }
  },
  setup(__props) {
    const { forwardRef } = useForwardExpose();
    const contentContext = injectPopperContentContext();
    const baseSide = vueExports.computed(() => OPPOSITE_SIDE[contentContext.placedSide.value]);
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createElementBlock("span", {
        ref: (el) => {
          vueExports.unref(contentContext).onArrowChange(el ?? void 0);
          return void 0;
        },
        style: vueExports.normalizeStyle({
          position: "absolute",
          left: vueExports.unref(contentContext).arrowX?.value ? `${vueExports.unref(contentContext).arrowX?.value}px` : void 0,
          top: vueExports.unref(contentContext).arrowY?.value ? `${vueExports.unref(contentContext).arrowY?.value}px` : void 0,
          [baseSide.value]: 0,
          transformOrigin: {
            top: "",
            right: "0 0",
            bottom: "center 0",
            left: "100% 0"
          }[vueExports.unref(contentContext).placedSide.value],
          transform: {
            top: "translateY(100%)",
            right: "translateY(50%) rotate(90deg) translateX(-50%)",
            bottom: `rotate(180deg)`,
            left: "translateY(50%) rotate(-90deg) translateX(50%)"
          }[vueExports.unref(contentContext).placedSide.value],
          visibility: vueExports.unref(contentContext).shouldHideArrow.value ? "hidden" : void 0
        })
      }, [vueExports.createVNode(Arrow_default, vueExports.mergeProps(_ctx.$attrs, {
        ref: vueExports.unref(forwardRef),
        style: { display: "block" },
        as: _ctx.as,
        "as-child": _ctx.asChild,
        rounded: _ctx.rounded,
        width: _ctx.width,
        height: _ctx.height
      }), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16, [
        "as",
        "as-child",
        "rounded",
        "width",
        "height"
      ])], 4);
    };
  }
});
var PopperArrow_default = PopperArrow_vue_vue_type_script_setup_true_lang_default;
function useNonce(nonce) {
  const context2 = injectConfigProviderContext({ nonce: vueExports.ref() });
  return vueExports.computed(() => nonce?.value || context2.nonce?.value);
}
const OPEN_KEYS = [
  " ",
  "Enter",
  "ArrowUp",
  "ArrowDown"
];
const SELECTION_KEYS = [" ", "Enter"];
const CONTENT_MARGIN = 10;
function valueComparator(value, currentValue, comparator) {
  if (value === void 0) return false;
  else if (Array.isArray(value)) return value.some((val) => compare(val, currentValue, comparator));
  else return compare(value, currentValue, comparator);
}
function compare(value, currentValue, comparator) {
  if (value === void 0 || currentValue === void 0) return false;
  if (typeof value === "string") return value === currentValue;
  if (typeof comparator === "function") return comparator(value, currentValue);
  if (typeof comparator === "string") return value?.[comparator] === currentValue?.[comparator];
  return isEqual(value, currentValue);
}
function shouldShowPlaceholder(value) {
  return value === void 0 || value === null || value === "" || Array.isArray(value) && value.length === 0;
}
const _hoisted_1$1 = {
  key: 0,
  value: ""
};
const [injectSelectRootContext, provideSelectRootContext] = /* @__PURE__ */ createContext("SelectRoot");
var SelectRoot_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  inheritAttrs: false,
  __name: "SelectRoot",
  props: {
    open: {
      type: Boolean,
      required: false,
      default: void 0
    },
    defaultOpen: {
      type: Boolean,
      required: false
    },
    defaultValue: {
      type: null,
      required: false
    },
    modelValue: {
      type: null,
      required: false,
      default: void 0
    },
    by: {
      type: [String, Function],
      required: false
    },
    dir: {
      type: String,
      required: false
    },
    multiple: {
      type: Boolean,
      required: false
    },
    autocomplete: {
      type: String,
      required: false
    },
    disabled: {
      type: Boolean,
      required: false
    },
    name: {
      type: String,
      required: false
    },
    required: {
      type: Boolean,
      required: false
    }
  },
  emits: ["update:modelValue", "update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { required, disabled, multiple, dir: propDir } = vueExports.toRefs(props);
    const modelValue = useVModel(props, "modelValue", emits, {
      defaultValue: props.defaultValue ?? (multiple.value ? [] : void 0),
      passive: props.modelValue === void 0,
      deep: true
    });
    const open = useVModel(props, "open", emits, {
      defaultValue: props.defaultOpen,
      passive: props.open === void 0
    });
    const triggerElement = vueExports.ref();
    const valueElement = vueExports.ref();
    const triggerPointerDownPosRef = vueExports.ref({
      x: 0,
      y: 0
    });
    const isEmptyModelValue = vueExports.computed(() => {
      if (multiple.value && Array.isArray(modelValue.value)) return modelValue.value?.length === 0;
      else return isNullish(modelValue.value);
    });
    useCollection({ isProvider: true });
    const dir = useDirection(propDir);
    const isFormControl = useFormControl(triggerElement);
    const optionsSet = vueExports.ref(/* @__PURE__ */ new Set());
    const nativeSelectKey = vueExports.computed(() => {
      return Array.from(optionsSet.value).map((option) => option.value).join(";");
    });
    function handleValueChange(value) {
      if (multiple.value) {
        const array = Array.isArray(modelValue.value) ? [...modelValue.value] : [];
        const index = array.findIndex((i) => compare(i, value, props.by));
        index === -1 ? array.push(value) : array.splice(index, 1);
        modelValue.value = [...array];
      } else modelValue.value = value;
    }
    function getOption(value) {
      return Array.from(optionsSet.value).find((option) => valueComparator(value, option.value, props.by));
    }
    provideSelectRootContext({
      triggerElement,
      onTriggerChange: (node) => {
        triggerElement.value = node;
      },
      valueElement,
      onValueElementChange: (node) => {
        valueElement.value = node;
      },
      contentId: "",
      modelValue,
      onValueChange: handleValueChange,
      by: props.by,
      open,
      multiple,
      required,
      onOpenChange: (value) => {
        open.value = value;
      },
      dir,
      triggerPointerDownPosRef,
      disabled,
      isEmptyModelValue,
      optionsSet,
      onOptionAdd: (option) => {
        const existingOption = getOption(option.value);
        if (existingOption) optionsSet.value.delete(existingOption);
        optionsSet.value.add(option);
      },
      onOptionRemove: (option) => {
        const existingOption = getOption(option.value);
        if (existingOption) optionsSet.value.delete(existingOption);
      }
    });
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(PopperRoot_default), null, {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default", {
          modelValue: vueExports.unref(modelValue),
          open: vueExports.unref(open)
        }), vueExports.unref(isFormControl) && _ctx.name ? (vueExports.openBlock(), vueExports.createBlock(BubbleSelect_default, {
          key: nativeSelectKey.value,
          "aria-hidden": "true",
          tabindex: "-1",
          multiple: vueExports.unref(multiple),
          required: vueExports.unref(required),
          name: _ctx.name,
          autocomplete: _ctx.autocomplete,
          disabled: vueExports.unref(disabled),
          value: vueExports.unref(modelValue)
        }, {
          default: vueExports.withCtx(() => [vueExports.unref(isNullish)(vueExports.unref(modelValue)) ? (vueExports.openBlock(), vueExports.createElementBlock("option", _hoisted_1$1)) : vueExports.createCommentVNode("v-if", true), (vueExports.openBlock(true), vueExports.createElementBlock(vueExports.Fragment, null, vueExports.renderList(Array.from(optionsSet.value), (option) => {
            return vueExports.openBlock(), vueExports.createElementBlock("option", vueExports.mergeProps({ key: option.value ?? "" }, { ref_for: true }, option), null, 16);
          }), 128))]),
          _: 1
        }, 8, [
          "multiple",
          "required",
          "name",
          "autocomplete",
          "disabled",
          "value"
        ])) : vueExports.createCommentVNode("v-if", true)]),
        _: 3
      });
    };
  }
});
var SelectRoot_default = SelectRoot_vue_vue_type_script_setup_true_lang_default;
var BubbleSelect_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "BubbleSelect",
  props: {
    autocomplete: {
      type: String,
      required: false
    },
    autofocus: {
      type: Boolean,
      required: false
    },
    disabled: {
      type: Boolean,
      required: false
    },
    form: {
      type: String,
      required: false
    },
    multiple: {
      type: Boolean,
      required: false
    },
    name: {
      type: String,
      required: false
    },
    required: {
      type: Boolean,
      required: false
    },
    size: {
      type: Number,
      required: false
    },
    value: {
      type: null,
      required: false
    }
  },
  setup(__props) {
    const props = __props;
    const selectElement = vueExports.ref();
    const rootContext = injectSelectRootContext();
    vueExports.watch(() => props.value, (cur, prev) => {
      const selectProto = (void 0).HTMLSelectElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(selectProto, "value");
      const setValue = descriptor.set;
      if (cur !== prev && setValue && selectElement.value) {
        const event = new Event("change", { bubbles: true });
        setValue.call(selectElement.value, cur);
        selectElement.value.dispatchEvent(event);
      }
    });
    function handleInput(event) {
      rootContext.onValueChange(event.target.value);
    }
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(VisuallyHidden_default), { "as-child": "" }, {
        default: vueExports.withCtx(() => [vueExports.createElementVNode("select", vueExports.mergeProps({
          ref_key: "selectElement",
          ref: selectElement
        }, props, { onInput: handleInput }), [vueExports.renderSlot(_ctx.$slots, "default")], 16)]),
        _: 3
      });
    };
  }
});
var BubbleSelect_default = BubbleSelect_vue_vue_type_script_setup_true_lang_default;
var SelectPopperPosition_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "SelectPopperPosition",
  props: {
    side: {
      type: null,
      required: false
    },
    sideOffset: {
      type: Number,
      required: false
    },
    sideFlip: {
      type: Boolean,
      required: false
    },
    align: {
      type: null,
      required: false,
      default: "start"
    },
    alignOffset: {
      type: Number,
      required: false
    },
    alignFlip: {
      type: Boolean,
      required: false
    },
    avoidCollisions: {
      type: Boolean,
      required: false
    },
    collisionBoundary: {
      type: null,
      required: false
    },
    collisionPadding: {
      type: [Number, Object],
      required: false,
      default: CONTENT_MARGIN
    },
    arrowPadding: {
      type: Number,
      required: false
    },
    hideShiftedArrow: {
      type: Boolean,
      required: false
    },
    sticky: {
      type: String,
      required: false
    },
    hideWhenDetached: {
      type: Boolean,
      required: false
    },
    positionStrategy: {
      type: String,
      required: false
    },
    updatePositionStrategy: {
      type: String,
      required: false
    },
    disableUpdateOnLayoutShift: {
      type: Boolean,
      required: false
    },
    prioritizePosition: {
      type: Boolean,
      required: false
    },
    reference: {
      type: null,
      required: false
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false
    }
  },
  setup(__props) {
    const props = __props;
    const forwarded = useForwardProps(props);
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(PopperContent_default), vueExports.mergeProps(vueExports.unref(forwarded), { style: {
        "boxSizing": "border-box",
        "--reka-select-content-transform-origin": "var(--reka-popper-transform-origin)",
        "--reka-select-content-available-width": "var(--reka-popper-available-width)",
        "--reka-select-content-available-height": "var(--reka-popper-available-height)",
        "--reka-select-trigger-width": "var(--reka-popper-anchor-width)",
        "--reka-select-trigger-height": "var(--reka-popper-anchor-height)"
      } }), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16);
    };
  }
});
var SelectPopperPosition_default = SelectPopperPosition_vue_vue_type_script_setup_true_lang_default;
const SelectContentDefaultContextValue = {
  onViewportChange: () => {
  },
  itemTextRefCallback: () => {
  },
  itemRefCallback: () => {
  }
};
const [injectSelectContentContext, provideSelectContentContext] = /* @__PURE__ */ createContext("SelectContent");
var SelectContentImpl_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "SelectContentImpl",
  props: {
    position: {
      type: String,
      required: false,
      default: "item-aligned"
    },
    bodyLock: {
      type: Boolean,
      required: false,
      default: true
    },
    side: {
      type: null,
      required: false
    },
    sideOffset: {
      type: Number,
      required: false
    },
    sideFlip: {
      type: Boolean,
      required: false
    },
    align: {
      type: null,
      required: false,
      default: "start"
    },
    alignOffset: {
      type: Number,
      required: false
    },
    alignFlip: {
      type: Boolean,
      required: false
    },
    avoidCollisions: {
      type: Boolean,
      required: false
    },
    collisionBoundary: {
      type: null,
      required: false
    },
    collisionPadding: {
      type: [Number, Object],
      required: false
    },
    arrowPadding: {
      type: Number,
      required: false
    },
    hideShiftedArrow: {
      type: Boolean,
      required: false
    },
    sticky: {
      type: String,
      required: false
    },
    hideWhenDetached: {
      type: Boolean,
      required: false
    },
    positionStrategy: {
      type: String,
      required: false
    },
    updatePositionStrategy: {
      type: String,
      required: false
    },
    disableUpdateOnLayoutShift: {
      type: Boolean,
      required: false
    },
    prioritizePosition: {
      type: Boolean,
      required: false
    },
    reference: {
      type: null,
      required: false
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false
    },
    disableOutsidePointerEvents: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  emits: [
    "closeAutoFocus",
    "escapeKeyDown",
    "pointerDownOutside"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const rootContext = injectSelectRootContext();
    useFocusGuards();
    useBodyScrollLock(props.bodyLock);
    const { CollectionSlot, getItems } = useCollection();
    const content = vueExports.ref();
    useHideOthers(content);
    const { search, handleTypeaheadSearch } = useTypeahead();
    const viewport = vueExports.ref();
    const selectedItem = vueExports.ref();
    const selectedItemText = vueExports.ref();
    const isPositioned = vueExports.ref(false);
    const firstValidItemFoundRef = vueExports.ref(false);
    const firstSelectedItemInArrayFoundRef = vueExports.ref(false);
    function focusSelectedItem() {
      if (selectedItem.value && content.value) focusFirst([selectedItem.value, content.value]);
    }
    vueExports.watch(isPositioned, () => {
      focusSelectedItem();
    });
    const { onOpenChange, triggerPointerDownPosRef } = rootContext;
    vueExports.watchEffect((cleanupFn) => {
      if (!content.value) return;
      let pointerMoveDelta = {
        x: 0,
        y: 0
      };
      const handlePointerMove = (event) => {
        pointerMoveDelta = {
          x: Math.abs(Math.round(event.pageX) - (triggerPointerDownPosRef.value?.x ?? 0)),
          y: Math.abs(Math.round(event.pageY) - (triggerPointerDownPosRef.value?.y ?? 0))
        };
      };
      const handlePointerUp = (event) => {
        if (event.pointerType === "touch") return;
        if (pointerMoveDelta.x <= 10 && pointerMoveDelta.y <= 10) event.preventDefault();
        else if (!content.value?.contains(event.target)) onOpenChange(false);
        (void 0).removeEventListener("pointermove", handlePointerMove);
        triggerPointerDownPosRef.value = null;
      };
      if (triggerPointerDownPosRef.value !== null) {
        (void 0).addEventListener("pointermove", handlePointerMove);
        (void 0).addEventListener("pointerup", handlePointerUp, {
          capture: true,
          once: true
        });
      }
      cleanupFn(() => {
        (void 0).removeEventListener("pointermove", handlePointerMove);
        (void 0).removeEventListener("pointerup", handlePointerUp, { capture: true });
      });
    });
    function handleKeyDown(event) {
      const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
      if (event.key === "Tab") event.preventDefault();
      if (!isModifierKey && event.key.length === 1) handleTypeaheadSearch(event.key, getItems());
      if ([
        "ArrowUp",
        "ArrowDown",
        "Home",
        "End"
      ].includes(event.key)) {
        const collectionItems = getItems().map((i) => i.ref);
        let candidateNodes = [...collectionItems];
        if (["ArrowUp", "End"].includes(event.key)) candidateNodes = candidateNodes.slice().reverse();
        if (["ArrowUp", "ArrowDown"].includes(event.key)) {
          const currentElement = event.target;
          const currentIndex = candidateNodes.indexOf(currentElement);
          candidateNodes = candidateNodes.slice(currentIndex + 1);
        }
        setTimeout(() => focusFirst(candidateNodes));
        event.preventDefault();
      }
    }
    const pickedProps = vueExports.computed(() => {
      if (props.position === "popper") return props;
      else return {};
    });
    const forwardedProps = useForwardProps(pickedProps.value);
    provideSelectContentContext({
      content,
      viewport,
      onViewportChange: (node) => {
        viewport.value = node;
      },
      itemRefCallback: (node, value, disabled) => {
        const isFirstValidItem = !firstValidItemFoundRef.value && !disabled;
        const isSelectedItem = valueComparator(rootContext.modelValue.value, value, rootContext.by);
        if (rootContext.multiple.value) {
          if (firstSelectedItemInArrayFoundRef.value) return;
          if (isSelectedItem || isFirstValidItem) {
            selectedItem.value = node;
            if (isSelectedItem) firstSelectedItemInArrayFoundRef.value = true;
          }
        } else if (isSelectedItem || isFirstValidItem) selectedItem.value = node;
        if (isFirstValidItem) firstValidItemFoundRef.value = true;
      },
      selectedItem,
      selectedItemText,
      onItemLeave: () => {
        content.value?.focus();
      },
      itemTextRefCallback: (node, value, disabled) => {
        const isFirstValidItem = !firstValidItemFoundRef.value && !disabled;
        const isSelectedItem = valueComparator(rootContext.modelValue.value, value, rootContext.by);
        if (isSelectedItem || isFirstValidItem) selectedItemText.value = node;
      },
      focusSelectedItem,
      position: props.position,
      isPositioned,
      searchRef: search
    });
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(CollectionSlot), null, {
        default: vueExports.withCtx(() => [vueExports.createVNode(vueExports.unref(FocusScope_default), {
          "as-child": "",
          onMountAutoFocus: _cache[6] || (_cache[6] = vueExports.withModifiers(() => {
          }, ["prevent"])),
          onUnmountAutoFocus: _cache[7] || (_cache[7] = (event) => {
            emits("closeAutoFocus", event);
            if (event.defaultPrevented) return;
            vueExports.unref(rootContext).triggerElement.value?.focus({ preventScroll: true });
            event.preventDefault();
          })
        }, {
          default: vueExports.withCtx(() => [vueExports.createVNode(vueExports.unref(DismissableLayer_default), {
            "as-child": "",
            "disable-outside-pointer-events": _ctx.disableOutsidePointerEvents,
            onFocusOutside: _cache[2] || (_cache[2] = vueExports.withModifiers(() => {
            }, ["prevent"])),
            onDismiss: _cache[3] || (_cache[3] = ($event) => vueExports.unref(rootContext).onOpenChange(false)),
            onEscapeKeyDown: _cache[4] || (_cache[4] = ($event) => emits("escapeKeyDown", $event)),
            onPointerDownOutside: _cache[5] || (_cache[5] = ($event) => emits("pointerDownOutside", $event))
          }, {
            default: vueExports.withCtx(() => [(vueExports.openBlock(), vueExports.createBlock(vueExports.resolveDynamicComponent(_ctx.position === "popper" ? SelectPopperPosition_default : SelectItemAlignedPosition_default), vueExports.mergeProps({
              ..._ctx.$attrs,
              ...vueExports.unref(forwardedProps)
            }, {
              id: vueExports.unref(rootContext).contentId,
              ref: (vnode) => {
                if (!vnode) return void 0;
                const el = vueExports.unref(unrefElement)(vnode);
                if (el?.hasAttribute("data-reka-popper-content-wrapper")) content.value = el.firstElementChild;
                else content.value = el;
                return void 0;
              },
              role: "listbox",
              "data-state": vueExports.unref(rootContext).open.value ? "open" : "closed",
              dir: vueExports.unref(rootContext).dir.value,
              style: {
                display: "flex",
                flexDirection: "column",
                outline: "none"
              },
              onContextmenu: _cache[0] || (_cache[0] = vueExports.withModifiers(() => {
              }, ["prevent"])),
              onPlaced: _cache[1] || (_cache[1] = ($event) => isPositioned.value = true),
              onKeydown: handleKeyDown
            }), {
              default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
              _: 3
            }, 16, [
              "id",
              "data-state",
              "dir",
              "onKeydown"
            ]))]),
            _: 3
          }, 8, ["disable-outside-pointer-events"])]),
          _: 3
        })]),
        _: 3
      });
    };
  }
});
var SelectContentImpl_default = SelectContentImpl_vue_vue_type_script_setup_true_lang_default;
const [injectSelectItemAlignedPositionContext, provideSelectItemAlignedPositionContext] = /* @__PURE__ */ createContext("SelectItemAlignedPosition");
var SelectItemAlignedPosition_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  inheritAttrs: false,
  __name: "SelectItemAlignedPosition",
  props: {
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false
    }
  },
  emits: ["placed"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { getItems } = useCollection();
    const rootContext = injectSelectRootContext();
    const contentContext = injectSelectContentContext();
    const shouldExpandOnScrollRef = vueExports.ref(false);
    const shouldRepositionRef = vueExports.ref(true);
    const contentWrapperElement = vueExports.ref();
    const { forwardRef, currentElement: contentElement } = useForwardExpose();
    const { viewport, selectedItem, selectedItemText, focusSelectedItem } = contentContext;
    function position() {
      if (rootContext.triggerElement.value && rootContext.valueElement.value && contentWrapperElement.value && contentElement.value && viewport?.value && selectedItem?.value && selectedItemText?.value) {
        const triggerRect = rootContext.triggerElement.value.getBoundingClientRect();
        const contentRect = contentElement.value.getBoundingClientRect();
        const valueNodeRect = rootContext.valueElement.value.getBoundingClientRect();
        const itemTextRect = selectedItemText.value.getBoundingClientRect();
        if (rootContext.dir.value !== "rtl") {
          const itemTextOffset = itemTextRect.left - contentRect.left;
          const left = valueNodeRect.left - itemTextOffset;
          const leftDelta = triggerRect.left - left;
          const minContentWidth = triggerRect.width + leftDelta;
          const contentWidth = Math.max(minContentWidth, contentRect.width);
          const rightEdge = (void 0).innerWidth - CONTENT_MARGIN;
          const clampedLeft = clamp$1(left, CONTENT_MARGIN, Math.max(CONTENT_MARGIN, rightEdge - contentWidth));
          contentWrapperElement.value.style.minWidth = `${minContentWidth}px`;
          contentWrapperElement.value.style.left = `${clampedLeft}px`;
        } else {
          const itemTextOffset = contentRect.right - itemTextRect.right;
          const right = (void 0).innerWidth - valueNodeRect.right - itemTextOffset;
          const rightDelta = (void 0).innerWidth - triggerRect.right - right;
          const minContentWidth = triggerRect.width + rightDelta;
          const contentWidth = Math.max(minContentWidth, contentRect.width);
          const leftEdge = (void 0).innerWidth - CONTENT_MARGIN;
          const clampedRight = clamp$1(right, CONTENT_MARGIN, Math.max(CONTENT_MARGIN, leftEdge - contentWidth));
          contentWrapperElement.value.style.minWidth = `${minContentWidth}px`;
          contentWrapperElement.value.style.right = `${clampedRight}px`;
        }
        const items = getItems().map((i) => i.ref);
        const availableHeight = (void 0).innerHeight - CONTENT_MARGIN * 2;
        const itemsHeight = viewport.value.scrollHeight;
        const contentStyles = (void 0).getComputedStyle(contentElement.value);
        const contentBorderTopWidth = Number.parseInt(contentStyles.borderTopWidth, 10);
        const contentPaddingTop = Number.parseInt(contentStyles.paddingTop, 10);
        const contentBorderBottomWidth = Number.parseInt(contentStyles.borderBottomWidth, 10);
        const contentPaddingBottom = Number.parseInt(contentStyles.paddingBottom, 10);
        const fullContentHeight = contentBorderTopWidth + contentPaddingTop + itemsHeight + contentPaddingBottom + contentBorderBottomWidth;
        const minContentHeight = Math.min(selectedItem.value.offsetHeight * 5, fullContentHeight);
        const viewportStyles = (void 0).getComputedStyle(viewport.value);
        const viewportPaddingTop = Number.parseInt(viewportStyles.paddingTop, 10);
        const viewportPaddingBottom = Number.parseInt(viewportStyles.paddingBottom, 10);
        const topEdgeToTriggerMiddle = triggerRect.top + triggerRect.height / 2 - CONTENT_MARGIN;
        const triggerMiddleToBottomEdge = availableHeight - topEdgeToTriggerMiddle;
        const selectedItemHalfHeight = selectedItem.value.offsetHeight / 2;
        const itemOffsetMiddle = selectedItem.value.offsetTop + selectedItemHalfHeight;
        const contentTopToItemMiddle = contentBorderTopWidth + contentPaddingTop + itemOffsetMiddle;
        const itemMiddleToContentBottom = fullContentHeight - contentTopToItemMiddle;
        const willAlignWithoutTopOverflow = contentTopToItemMiddle <= topEdgeToTriggerMiddle;
        if (willAlignWithoutTopOverflow) {
          const isLastItem = selectedItem.value === items.at(-1);
          contentWrapperElement.value.style.bottom = `0px`;
          const viewportOffsetBottom = contentElement.value.clientHeight - viewport.value.offsetTop - viewport.value.offsetHeight;
          const clampedTriggerMiddleToBottomEdge = Math.max(triggerMiddleToBottomEdge, selectedItemHalfHeight + (isLastItem ? viewportPaddingBottom : 0) + viewportOffsetBottom + contentBorderBottomWidth);
          const height = contentTopToItemMiddle + clampedTriggerMiddleToBottomEdge;
          contentWrapperElement.value.style.height = `${height}px`;
        } else {
          const isFirstItem = selectedItem.value === items[0];
          contentWrapperElement.value.style.top = `0px`;
          const clampedTopEdgeToTriggerMiddle = Math.max(topEdgeToTriggerMiddle, contentBorderTopWidth + viewport.value.offsetTop + (isFirstItem ? viewportPaddingTop : 0) + selectedItemHalfHeight);
          const height = clampedTopEdgeToTriggerMiddle + itemMiddleToContentBottom;
          contentWrapperElement.value.style.height = `${height}px`;
          viewport.value.scrollTop = contentTopToItemMiddle - topEdgeToTriggerMiddle + viewport.value.offsetTop;
        }
        contentWrapperElement.value.style.margin = `${CONTENT_MARGIN}px 0`;
        contentWrapperElement.value.style.minHeight = `${minContentHeight}px`;
        contentWrapperElement.value.style.maxHeight = `${availableHeight}px`;
        emits("placed");
        requestAnimationFrame(() => shouldExpandOnScrollRef.value = true);
      }
    }
    const contentZIndex = vueExports.ref("");
    function handleScrollButtonChange(node) {
      if (node && shouldRepositionRef.value === true) {
        position();
        focusSelectedItem?.();
        shouldRepositionRef.value = false;
      }
    }
    useResizeObserver(rootContext.triggerElement, () => {
      position();
    });
    provideSelectItemAlignedPositionContext({
      contentWrapper: contentWrapperElement,
      shouldExpandOnScrollRef,
      onScrollButtonChange: handleScrollButtonChange
    });
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createElementBlock("div", {
        ref_key: "contentWrapperElement",
        ref: contentWrapperElement,
        style: vueExports.normalizeStyle({
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          zIndex: contentZIndex.value
        })
      }, [vueExports.createVNode(vueExports.unref(Primitive), vueExports.mergeProps({
        ref: vueExports.unref(forwardRef),
        style: {
          boxSizing: "border-box",
          maxHeight: "100%"
        }
      }, {
        ..._ctx.$attrs,
        ...props
      }), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16)], 4);
    };
  }
});
var SelectItemAlignedPosition_default = SelectItemAlignedPosition_vue_vue_type_script_setup_true_lang_default;
var SelectArrow_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "SelectArrow",
  props: {
    width: {
      type: Number,
      required: false,
      default: 10
    },
    height: {
      type: Number,
      required: false,
      default: 5
    },
    rounded: {
      type: Boolean,
      required: false
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false,
      default: "svg"
    }
  },
  setup(__props) {
    const props = __props;
    const contentContext = injectSelectContentContext(SelectContentDefaultContextValue);
    return (_ctx, _cache) => {
      return vueExports.unref(contentContext).position === "popper" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(PopperArrow_default), vueExports.normalizeProps(vueExports.mergeProps({ key: 0 }, props)), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16)) : vueExports.createCommentVNode("v-if", true);
    };
  }
});
var SelectArrow_default = SelectArrow_vue_vue_type_script_setup_true_lang_default;
var SelectProvider_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  inheritAttrs: false,
  __name: "SelectProvider",
  props: { context: {
    type: Object,
    required: true
  } },
  setup(__props) {
    const props = __props;
    provideSelectRootContext(props.context);
    provideSelectContentContext(SelectContentDefaultContextValue);
    return (_ctx, _cache) => {
      return vueExports.renderSlot(_ctx.$slots, "default");
    };
  }
});
var SelectProvider_default = SelectProvider_vue_vue_type_script_setup_true_lang_default;
const _hoisted_1 = { key: 1 };
var SelectContent_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  inheritAttrs: false,
  __name: "SelectContent",
  props: {
    forceMount: {
      type: Boolean,
      required: false
    },
    position: {
      type: String,
      required: false
    },
    bodyLock: {
      type: Boolean,
      required: false
    },
    side: {
      type: null,
      required: false
    },
    sideOffset: {
      type: Number,
      required: false
    },
    sideFlip: {
      type: Boolean,
      required: false
    },
    align: {
      type: null,
      required: false
    },
    alignOffset: {
      type: Number,
      required: false
    },
    alignFlip: {
      type: Boolean,
      required: false
    },
    avoidCollisions: {
      type: Boolean,
      required: false
    },
    collisionBoundary: {
      type: null,
      required: false
    },
    collisionPadding: {
      type: [Number, Object],
      required: false
    },
    arrowPadding: {
      type: Number,
      required: false
    },
    hideShiftedArrow: {
      type: Boolean,
      required: false
    },
    sticky: {
      type: String,
      required: false
    },
    hideWhenDetached: {
      type: Boolean,
      required: false
    },
    positionStrategy: {
      type: String,
      required: false
    },
    updatePositionStrategy: {
      type: String,
      required: false
    },
    disableUpdateOnLayoutShift: {
      type: Boolean,
      required: false
    },
    prioritizePosition: {
      type: Boolean,
      required: false
    },
    reference: {
      type: null,
      required: false
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false
    },
    disableOutsidePointerEvents: {
      type: Boolean,
      required: false
    }
  },
  emits: [
    "closeAutoFocus",
    "escapeKeyDown",
    "pointerDownOutside"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    const rootContext = injectSelectRootContext();
    const fragment = vueExports.ref();
    const presenceRef = vueExports.ref();
    const present = vueExports.computed(() => props.forceMount || rootContext.open.value);
    const renderPresence = vueExports.ref(present.value);
    vueExports.watch(present, () => {
      setTimeout(() => renderPresence.value = present.value);
    });
    return (_ctx, _cache) => {
      return present.value || renderPresence.value || presenceRef.value?.present ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Presence_default), {
        key: 0,
        ref_key: "presenceRef",
        ref: presenceRef,
        present: present.value
      }, {
        default: vueExports.withCtx(() => [vueExports.createVNode(SelectContentImpl_default, vueExports.normalizeProps(vueExports.guardReactiveProps({
          ...vueExports.unref(forwarded),
          ..._ctx.$attrs
        })), {
          default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
          _: 3
        }, 16)]),
        _: 3
      }, 8, ["present"])) : fragment.value ? (vueExports.openBlock(), vueExports.createElementBlock("div", _hoisted_1, [(vueExports.openBlock(), vueExports.createBlock(vueExports.Teleport, { to: fragment.value }, [vueExports.createVNode(SelectProvider_default, { context: vueExports.unref(rootContext) }, {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 8, ["context"])], 8, ["to"]))])) : vueExports.createCommentVNode("v-if", true);
    };
  }
});
var SelectContent_default = SelectContent_vue_vue_type_script_setup_true_lang_default;
const [injectSelectGroupContext, provideSelectGroupContext] = /* @__PURE__ */ createContext("SelectGroup");
var SelectGroup_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "SelectGroup",
  props: {
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false
    }
  },
  setup(__props) {
    const props = __props;
    const id = useId(void 0, "reka-select-group");
    provideSelectGroupContext({ id });
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), vueExports.mergeProps({ role: "group" }, props, { "aria-labelledby": vueExports.unref(id) }), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16, ["aria-labelledby"]);
    };
  }
});
var SelectGroup_default = SelectGroup_vue_vue_type_script_setup_true_lang_default;
const [injectSelectItemContext, provideSelectItemContext] = /* @__PURE__ */ createContext("SelectItem");
var SelectItem_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "SelectItem",
  props: {
    value: {
      type: null,
      required: true
    },
    disabled: {
      type: Boolean,
      required: false
    },
    textValue: {
      type: String,
      required: false
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false
    }
  },
  emits: ["select"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { disabled } = vueExports.toRefs(props);
    const rootContext = injectSelectRootContext();
    const contentContext = injectSelectContentContext();
    const { forwardRef } = useForwardExpose();
    const { CollectionItem } = useCollection();
    const isSelected = vueExports.computed(() => valueComparator(rootContext.modelValue?.value, props.value, rootContext.by));
    const isFocused = vueExports.ref(false);
    const textValue = vueExports.ref(props.textValue ?? "");
    const textId = useId(void 0, "reka-select-item-text");
    const SELECT_SELECT = "select.select";
    async function handleSelectCustomEvent(ev) {
      if (ev.defaultPrevented) return;
      const eventDetail = {
        originalEvent: ev,
        value: props.value
      };
      handleAndDispatchCustomEvent(SELECT_SELECT, handleSelect, eventDetail);
    }
    async function handleSelect(ev) {
      await vueExports.nextTick();
      emits("select", ev);
      if (ev.defaultPrevented) return;
      if (!disabled.value) {
        rootContext.onValueChange(props.value);
        if (!rootContext.multiple.value) rootContext.onOpenChange(false);
      }
    }
    async function handlePointerMove(event) {
      await vueExports.nextTick();
      if (event.defaultPrevented) return;
      if (disabled.value) contentContext.onItemLeave?.();
      else event.currentTarget?.focus({ preventScroll: true });
    }
    async function handlePointerLeave(event) {
      await vueExports.nextTick();
      if (event.defaultPrevented) return;
      if (event.currentTarget === getActiveElement()) contentContext.onItemLeave?.();
    }
    async function handleKeyDown(event) {
      await vueExports.nextTick();
      if (event.defaultPrevented) return;
      const isTypingAhead = contentContext.searchRef?.value !== "";
      if (isTypingAhead && event.key === " ") return;
      if (SELECTION_KEYS.includes(event.key)) handleSelectCustomEvent(event);
      if (event.key === " ") event.preventDefault();
    }
    if (props.value === "") throw new Error("A <SelectItem /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.");
    provideSelectItemContext({
      value: props.value,
      disabled,
      textId,
      isSelected,
      onItemTextChange: (node) => {
        textValue.value = ((textValue.value || node?.textContent) ?? "").trim();
      }
    });
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(CollectionItem), { value: { textValue: textValue.value } }, {
        default: vueExports.withCtx(() => [vueExports.createVNode(vueExports.unref(Primitive), {
          ref: vueExports.unref(forwardRef),
          role: "option",
          "aria-labelledby": vueExports.unref(textId),
          "data-highlighted": isFocused.value ? "" : void 0,
          "aria-selected": isSelected.value,
          "data-state": isSelected.value ? "checked" : "unchecked",
          "aria-disabled": vueExports.unref(disabled) || void 0,
          "data-disabled": vueExports.unref(disabled) ? "" : void 0,
          tabindex: vueExports.unref(disabled) ? void 0 : -1,
          as: _ctx.as,
          "as-child": _ctx.asChild,
          onFocus: _cache[0] || (_cache[0] = ($event) => isFocused.value = true),
          onBlur: _cache[1] || (_cache[1] = ($event) => isFocused.value = false),
          onPointerup: handleSelectCustomEvent,
          onPointerdown: _cache[2] || (_cache[2] = (event) => {
            event.currentTarget.focus({ preventScroll: true });
          }),
          onTouchend: _cache[3] || (_cache[3] = vueExports.withModifiers(() => {
          }, ["prevent", "stop"])),
          onPointermove: handlePointerMove,
          onPointerleave: handlePointerLeave,
          onKeydown: handleKeyDown
        }, {
          default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
          _: 3
        }, 8, [
          "aria-labelledby",
          "data-highlighted",
          "aria-selected",
          "data-state",
          "aria-disabled",
          "data-disabled",
          "tabindex",
          "as",
          "as-child"
        ])]),
        _: 3
      }, 8, ["value"]);
    };
  }
});
var SelectItem_default = SelectItem_vue_vue_type_script_setup_true_lang_default;
var SelectItemIndicator_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "SelectItemIndicator",
  props: {
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false,
      default: "span"
    }
  },
  setup(__props) {
    const props = __props;
    const itemContext = injectSelectItemContext();
    return (_ctx, _cache) => {
      return vueExports.unref(itemContext).isSelected.value ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), vueExports.mergeProps({
        key: 0,
        "aria-hidden": "true"
      }, props), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16)) : vueExports.createCommentVNode("v-if", true);
    };
  }
});
var SelectItemIndicator_default = SelectItemIndicator_vue_vue_type_script_setup_true_lang_default;
var SelectItemText_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  inheritAttrs: false,
  __name: "SelectItemText",
  props: {
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false,
      default: "span"
    }
  },
  setup(__props) {
    const props = __props;
    injectSelectRootContext();
    injectSelectContentContext();
    const itemContext = injectSelectItemContext();
    const { forwardRef, currentElement: itemTextElement } = useForwardExpose();
    vueExports.computed(() => {
      return {
        value: itemContext.value,
        disabled: itemContext.disabled.value,
        textContent: itemTextElement.value?.textContent ?? itemContext.value?.toString() ?? ""
      };
    });
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), vueExports.mergeProps({
        id: vueExports.unref(itemContext).textId,
        ref: vueExports.unref(forwardRef)
      }, {
        ...props,
        ..._ctx.$attrs
      }), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16, ["id"]);
    };
  }
});
var SelectItemText_default = SelectItemText_vue_vue_type_script_setup_true_lang_default;
var SelectLabel_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "SelectLabel",
  props: {
    for: {
      type: String,
      required: false
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false,
      default: "div"
    }
  },
  setup(__props) {
    const props = __props;
    const groupContext = injectSelectGroupContext({ id: "" });
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), vueExports.mergeProps(props, { id: vueExports.unref(groupContext).id }), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16, ["id"]);
    };
  }
});
var SelectLabel_default = SelectLabel_vue_vue_type_script_setup_true_lang_default;
var SelectPortal_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "SelectPortal",
  props: {
    to: {
      type: null,
      required: false
    },
    disabled: {
      type: Boolean,
      required: false
    },
    defer: {
      type: Boolean,
      required: false
    },
    forceMount: {
      type: Boolean,
      required: false
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Teleport_default), vueExports.normalizeProps(vueExports.guardReactiveProps(props)), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16);
    };
  }
});
var SelectPortal_default = SelectPortal_vue_vue_type_script_setup_true_lang_default;
var SelectSeparator_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "SelectSeparator",
  props: {
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), vueExports.mergeProps({ "aria-hidden": "true" }, props), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16);
    };
  }
});
var SelectSeparator_default = SelectSeparator_vue_vue_type_script_setup_true_lang_default;
var SelectTrigger_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "SelectTrigger",
  props: {
    disabled: {
      type: Boolean,
      required: false
    },
    reference: {
      type: null,
      required: false
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false,
      default: "button"
    }
  },
  setup(__props) {
    const props = __props;
    const rootContext = injectSelectRootContext();
    const { forwardRef } = useForwardExpose();
    const isDisabled = vueExports.computed(() => rootContext.disabled?.value || props.disabled);
    rootContext.contentId ||= useId(void 0, "reka-select-content");
    const { getItems } = useCollection();
    const { search, handleTypeaheadSearch, resetTypeahead } = useTypeahead();
    function handleOpen() {
      if (!isDisabled.value) {
        rootContext.onOpenChange(true);
        resetTypeahead();
      }
    }
    function handlePointerOpen(event) {
      handleOpen();
      rootContext.triggerPointerDownPosRef.value = {
        x: Math.round(event.pageX),
        y: Math.round(event.pageY)
      };
    }
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(PopperAnchor_default), {
        "as-child": "",
        reference: _ctx.reference
      }, {
        default: vueExports.withCtx(() => [vueExports.createVNode(vueExports.unref(Primitive), {
          ref: vueExports.unref(forwardRef),
          role: "combobox",
          type: _ctx.as === "button" ? "button" : void 0,
          "aria-controls": vueExports.unref(rootContext).contentId,
          "aria-expanded": vueExports.unref(rootContext).open.value || false,
          "aria-required": vueExports.unref(rootContext).required?.value,
          "aria-autocomplete": "none",
          disabled: isDisabled.value,
          dir: vueExports.unref(rootContext)?.dir.value,
          "data-state": vueExports.unref(rootContext)?.open.value ? "open" : "closed",
          "data-disabled": isDisabled.value ? "" : void 0,
          "data-placeholder": vueExports.unref(shouldShowPlaceholder)(vueExports.unref(rootContext).modelValue?.value) ? "" : void 0,
          "as-child": _ctx.asChild,
          as: _ctx.as,
          onClick: _cache[0] || (_cache[0] = (event) => {
            event?.currentTarget?.focus();
          }),
          onPointerdown: _cache[1] || (_cache[1] = (event) => {
            if (event.pointerType === "touch") return event.preventDefault();
            const target = event.target;
            if (target.hasPointerCapture(event.pointerId)) target.releasePointerCapture(event.pointerId);
            if (event.button === 0 && event.ctrlKey === false) {
              handlePointerOpen(event);
              event.preventDefault();
            }
          }),
          onPointerup: _cache[2] || (_cache[2] = vueExports.withModifiers((event) => {
            if (event.pointerType === "touch") handlePointerOpen(event);
          }, ["prevent"])),
          onKeydown: _cache[3] || (_cache[3] = (event) => {
            const isTypingAhead = vueExports.unref(search) !== "";
            const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
            if (!isModifierKey && event.key.length === 1) {
              if (isTypingAhead && event.key === " ") return;
            }
            vueExports.unref(handleTypeaheadSearch)(event.key, vueExports.unref(getItems)());
            if (vueExports.unref(OPEN_KEYS).includes(event.key)) {
              handleOpen();
              event.preventDefault();
            }
          })
        }, {
          default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
          _: 3
        }, 8, [
          "type",
          "aria-controls",
          "aria-expanded",
          "aria-required",
          "disabled",
          "dir",
          "data-state",
          "data-disabled",
          "data-placeholder",
          "as-child",
          "as"
        ])]),
        _: 3
      }, 8, ["reference"]);
    };
  }
});
var SelectTrigger_default = SelectTrigger_vue_vue_type_script_setup_true_lang_default;
var SelectValue_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "SelectValue",
  props: {
    placeholder: {
      type: String,
      required: false,
      default: ""
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false,
      default: "span"
    }
  },
  setup(__props) {
    const props = __props;
    const { forwardRef } = useForwardExpose();
    const rootContext = injectSelectRootContext();
    const selectedLabel = vueExports.computed(() => {
      let list = [];
      const options = Array.from(rootContext.optionsSet.value);
      const getOption = (value) => options.find((option) => valueComparator(value, option.value, rootContext.by));
      if (Array.isArray(rootContext.modelValue.value)) list = rootContext.modelValue.value.map((value) => getOption(value)?.textContent ?? "");
      else list = [getOption(rootContext.modelValue.value)?.textContent ?? ""];
      return list.filter(Boolean);
    });
    const slotText = vueExports.computed(() => {
      return selectedLabel.value.length ? selectedLabel.value.join(", ") : props.placeholder;
    });
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), {
        ref: vueExports.unref(forwardRef),
        as: _ctx.as,
        "as-child": _ctx.asChild,
        style: { pointerEvents: "none" },
        "data-placeholder": selectedLabel.value.length ? void 0 : props.placeholder
      }, {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default", {
          selectedLabel: selectedLabel.value,
          modelValue: vueExports.unref(rootContext).modelValue.value
        }, () => [vueExports.createTextVNode(vueExports.toDisplayString(slotText.value), 1)])]),
        _: 3
      }, 8, [
        "as",
        "as-child",
        "data-placeholder"
      ]);
    };
  }
});
var SelectValue_default = SelectValue_vue_vue_type_script_setup_true_lang_default;
var SelectViewport_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
  __name: "SelectViewport",
  props: {
    nonce: {
      type: String,
      required: false
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false
    }
  },
  setup(__props) {
    const props = __props;
    const { nonce: propNonce } = vueExports.toRefs(props);
    const nonce = useNonce(propNonce);
    const contentContext = injectSelectContentContext();
    const alignedPositionContext = contentContext.position === "item-aligned" ? injectSelectItemAlignedPositionContext() : void 0;
    const { forwardRef } = useForwardExpose();
    const prevScrollTopRef = vueExports.ref(0);
    function handleScroll(event) {
      const viewport = event.currentTarget;
      const { shouldExpandOnScrollRef, contentWrapper } = alignedPositionContext ?? {};
      if (shouldExpandOnScrollRef?.value && contentWrapper?.value) {
        const scrolledBy = Math.abs(prevScrollTopRef.value - viewport.scrollTop);
        if (scrolledBy > 0) {
          const availableHeight = (void 0).innerHeight - CONTENT_MARGIN * 2;
          const cssMinHeight = Number.parseFloat(contentWrapper.value.style.minHeight);
          const cssHeight = Number.parseFloat(contentWrapper.value.style.height);
          const prevHeight = Math.max(cssMinHeight, cssHeight);
          if (prevHeight < availableHeight) {
            const nextHeight = prevHeight + scrolledBy;
            const clampedNextHeight = Math.min(availableHeight, nextHeight);
            const heightDiff = nextHeight - clampedNextHeight;
            contentWrapper.value.style.height = `${clampedNextHeight}px`;
            if (contentWrapper.value.style.bottom === "0px") {
              viewport.scrollTop = heightDiff > 0 ? heightDiff : 0;
              contentWrapper.value.style.justifyContent = "flex-end";
            }
          }
        }
      }
      prevScrollTopRef.value = viewport.scrollTop;
    }
    return (_ctx, _cache) => {
      return vueExports.openBlock(), vueExports.createElementBlock(vueExports.Fragment, null, [vueExports.createVNode(vueExports.unref(Primitive), vueExports.mergeProps({
        ref: vueExports.unref(forwardRef),
        "data-reka-select-viewport": "",
        role: "presentation"
      }, {
        ..._ctx.$attrs,
        ...props
      }, {
        style: {
          position: "relative",
          flex: 1,
          overflow: "hidden auto"
        },
        onScroll: handleScroll
      }), {
        default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16), vueExports.createVNode(vueExports.unref(Primitive), {
        as: "style",
        nonce: vueExports.unref(nonce)
      }, {
        default: vueExports.withCtx(() => _cache[0] || (_cache[0] = [vueExports.createTextVNode(" /* Hide scrollbars cross-browser and enable momentum scroll for touch devices */ [data-reka-select-viewport] { scrollbar-width:none; -ms-overflow-style: none; -webkit-overflow-scrolling: touch; } [data-reka-select-viewport]::-webkit-scrollbar { display: none; } ")])),
        _: 1,
        __: [0]
      }, 8, ["nonce"])], 64);
    };
  }
});
var SelectViewport_default = SelectViewport_vue_vue_type_script_setup_true_lang_default;
function useResolvedVariants(name, props, theme2, keys, overrides) {
  const appConfig = useAppConfig();
  const result = {};
  for (const key of keys) {
    result[key] = vueExports.computed(() => {
      const value = overrides?.[key] !== void 0 ? vueExports.toValue(overrides[key]) : get(props, key);
      return value ?? appConfig.ui?.[name]?.defaultVariants?.[key] ?? theme2.defaultVariants?.[key];
    });
  }
  return result;
}
const theme = {
  "slots": {
    "base": [
      "relative group rounded-md inline-flex items-center focus:outline-none disabled:cursor-not-allowed disabled:opacity-75",
      "transition-colors"
    ],
    "leading": "absolute inset-y-0 start-0 flex items-center",
    "leadingIcon": "shrink-0 text-dimmed",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "trailing": "absolute inset-y-0 end-0 flex items-center",
    "trailingIcon": "shrink-0 text-dimmed",
    "value": "truncate pointer-events-none",
    "placeholder": "truncate text-dimmed",
    "arrow": "fill-bg stroke-default",
    "content": "max-h-60 w-(--reka-select-trigger-width) bg-default shadow-lg rounded-md ring ring-default overflow-hidden origin-(--reka-select-content-transform-origin) pointer-events-auto flex flex-col",
    "viewport": "relative divide-y divide-default scroll-py-1 overflow-y-auto flex-1",
    "group": "p-1 isolate",
    "empty": "text-center text-muted",
    "label": "font-semibold text-highlighted",
    "separator": "-mx-1 my-1 h-px bg-border",
    "item": [
      "group relative w-full flex items-start select-none outline-none before:absolute before:z-[-1] before:inset-px before:rounded-md data-disabled:cursor-not-allowed data-disabled:opacity-75 text-default data-highlighted:not-data-disabled:text-highlighted data-highlighted:not-data-disabled:before:bg-elevated/50",
      "transition-colors before:transition-colors"
    ],
    "itemLeadingIcon": [
      "shrink-0 text-dimmed group-data-highlighted:not-group-data-disabled:text-default",
      "transition-colors"
    ],
    "itemLeadingAvatar": "shrink-0",
    "itemLeadingAvatarSize": "",
    "itemLeadingChip": "shrink-0",
    "itemLeadingChipSize": "",
    "itemTrailing": "ms-auto inline-flex gap-1.5 items-center",
    "itemTrailingIcon": "shrink-0",
    "itemWrapper": "flex-1 flex flex-col min-w-0",
    "itemLabel": "truncate",
    "itemDescription": "truncate text-muted"
  },
  "variants": {
    "fieldGroup": {
      "horizontal": "not-only:first:rounded-e-none not-only:last:rounded-s-none not-last:not-first:rounded-none focus-visible:z-[1]",
      "vertical": "not-only:first:rounded-b-none not-only:last:rounded-t-none not-last:not-first:rounded-none focus-visible:z-[1]"
    },
    "size": {
      "xs": {
        "base": "px-2 py-1 text-xs gap-1",
        "leading": "ps-2",
        "trailing": "pe-2",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4",
        "label": "p-1 text-[10px]/3 gap-1",
        "item": "p-1 text-xs gap-1",
        "itemLeadingIcon": "size-4",
        "itemLeadingAvatarSize": "3xs",
        "itemLeadingChip": "size-4",
        "itemLeadingChipSize": "sm",
        "itemTrailingIcon": "size-4",
        "empty": "p-2 text-xs"
      },
      "sm": {
        "base": "px-2.5 py-1.5 text-xs gap-1.5",
        "leading": "ps-2.5",
        "trailing": "pe-2.5",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4",
        "label": "p-1.5 text-[10px]/3 gap-1.5",
        "item": "p-1.5 text-xs gap-1.5",
        "itemLeadingIcon": "size-4",
        "itemLeadingAvatarSize": "3xs",
        "itemLeadingChip": "size-4",
        "itemLeadingChipSize": "sm",
        "itemTrailingIcon": "size-4",
        "empty": "p-2.5 text-xs"
      },
      "md": {
        "base": "px-2.5 py-1.5 text-sm gap-1.5",
        "leading": "ps-2.5",
        "trailing": "pe-2.5",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5",
        "label": "p-1.5 text-xs gap-1.5",
        "item": "p-1.5 text-sm gap-1.5",
        "itemLeadingIcon": "size-5",
        "itemLeadingAvatarSize": "2xs",
        "itemLeadingChip": "size-5",
        "itemLeadingChipSize": "md",
        "itemTrailingIcon": "size-5",
        "empty": "p-2.5 text-sm"
      },
      "lg": {
        "base": "px-3 py-2 text-sm gap-2",
        "leading": "ps-3",
        "trailing": "pe-3",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5",
        "label": "p-2 text-xs gap-2",
        "item": "p-2 text-sm gap-2",
        "itemLeadingIcon": "size-5",
        "itemLeadingAvatarSize": "2xs",
        "itemLeadingChip": "size-5",
        "itemLeadingChipSize": "md",
        "itemTrailingIcon": "size-5",
        "empty": "p-3 text-sm"
      },
      "xl": {
        "base": "px-3 py-2 text-base gap-2",
        "leading": "ps-3",
        "trailing": "pe-3",
        "leadingIcon": "size-6",
        "leadingAvatarSize": "xs",
        "trailingIcon": "size-6",
        "label": "p-2 text-sm gap-2",
        "item": "p-2 text-base gap-2",
        "itemLeadingIcon": "size-6",
        "itemLeadingAvatarSize": "xs",
        "itemLeadingChip": "size-6",
        "itemLeadingChipSize": "lg",
        "itemTrailingIcon": "size-6",
        "empty": "p-3 text-base"
      }
    },
    "variant": {
      "outline": "text-highlighted bg-default ring ring-inset ring-accented hover:bg-elevated disabled:bg-default",
      "soft": "text-highlighted bg-elevated/50 hover:bg-elevated focus:bg-elevated disabled:bg-elevated/50",
      "subtle": "text-highlighted bg-elevated ring ring-inset ring-accented hover:bg-accented/75 disabled:bg-elevated",
      "ghost": "text-highlighted bg-transparent hover:bg-elevated focus:bg-elevated disabled:bg-transparent dark:disabled:bg-transparent",
      "none": "text-highlighted bg-transparent"
    },
    "color": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "leading": {
      "true": ""
    },
    "trailing": {
      "true": ""
    },
    "loading": {
      "true": ""
    },
    "highlight": {
      "true": ""
    },
    "fixed": {
      "false": ""
    },
    "type": {
      "file": "file:me-1.5 file:font-medium file:text-muted file:outline-none"
    },
    "position": {
      "popper": {
        "content": "data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in]"
      },
      "item-aligned": {
        "content": ""
      }
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus:ring-2 focus:ring-inset focus:ring-primary"
    },
    {
      "color": "secondary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus:ring-2 focus:ring-inset focus:ring-secondary"
    },
    {
      "color": "success",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus:ring-2 focus:ring-inset focus:ring-success"
    },
    {
      "color": "info",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus:ring-2 focus:ring-inset focus:ring-info"
    },
    {
      "color": "warning",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus:ring-2 focus:ring-inset focus:ring-warning"
    },
    {
      "color": "error",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus:ring-2 focus:ring-inset focus:ring-error"
    },
    {
      "color": "primary",
      "highlight": true,
      "class": "ring ring-inset ring-primary"
    },
    {
      "color": "secondary",
      "highlight": true,
      "class": "ring ring-inset ring-secondary"
    },
    {
      "color": "success",
      "highlight": true,
      "class": "ring ring-inset ring-success"
    },
    {
      "color": "info",
      "highlight": true,
      "class": "ring ring-inset ring-info"
    },
    {
      "color": "warning",
      "highlight": true,
      "class": "ring ring-inset ring-warning"
    },
    {
      "color": "error",
      "highlight": true,
      "class": "ring ring-inset ring-error"
    },
    {
      "color": "neutral",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus:ring-2 focus:ring-inset focus:ring-inverted"
    },
    {
      "color": "neutral",
      "highlight": true,
      "class": "ring ring-inset ring-inverted"
    },
    {
      "leading": true,
      "size": "xs",
      "class": "ps-7"
    },
    {
      "leading": true,
      "size": "sm",
      "class": "ps-8"
    },
    {
      "leading": true,
      "size": "md",
      "class": "ps-9"
    },
    {
      "leading": true,
      "size": "lg",
      "class": "ps-10"
    },
    {
      "leading": true,
      "size": "xl",
      "class": "ps-11"
    },
    {
      "trailing": true,
      "size": "xs",
      "class": "pe-7"
    },
    {
      "trailing": true,
      "size": "sm",
      "class": "pe-8"
    },
    {
      "trailing": true,
      "size": "md",
      "class": "pe-9"
    },
    {
      "trailing": true,
      "size": "lg",
      "class": "pe-10"
    },
    {
      "trailing": true,
      "size": "xl",
      "class": "pe-11"
    },
    {
      "loading": true,
      "leading": true,
      "class": {
        "leadingIcon": "animate-spin"
      }
    },
    {
      "loading": true,
      "leading": false,
      "trailing": true,
      "class": {
        "trailingIcon": "animate-spin"
      }
    },
    {
      "fixed": false,
      "size": "xs",
      "class": "md:text-xs"
    },
    {
      "fixed": false,
      "size": "sm",
      "class": "md:text-xs"
    },
    {
      "fixed": false,
      "size": "md",
      "class": "md:text-sm"
    },
    {
      "fixed": false,
      "size": "lg",
      "class": "md:text-sm"
    }
  ],
  "defaultVariants": {
    "size": "md",
    "color": "primary",
    "variant": "outline",
    "position": "popper"
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "USelect",
  __ssrInlineRender: true,
  props: {
    id: { type: String, required: false },
    placeholder: { type: String, required: false },
    color: { type: null, required: false },
    variant: { type: null, required: false },
    size: { type: null, required: false },
    trailingIcon: { type: null, required: false },
    selectedIcon: { type: null, required: false },
    content: { type: Object, required: false },
    arrow: { type: [Boolean, Object], required: false },
    portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
    valueKey: { type: null, required: false, default: "value" },
    labelKey: { type: null, required: false, default: "label" },
    descriptionKey: { type: null, required: false, default: "description" },
    items: { type: null, required: false },
    defaultValue: { type: null, required: false },
    modelValue: { type: null, required: false },
    modelModifiers: { type: null, required: false },
    multiple: { type: Boolean, required: false },
    highlight: { type: Boolean, required: false },
    autofocus: { type: Boolean, required: false },
    autofocusDelay: { type: Number, required: false, default: 0 },
    class: { type: null, required: false },
    ui: { type: Object, required: false },
    open: { type: Boolean, required: false },
    defaultOpen: { type: Boolean, required: false },
    autocomplete: { type: String, required: false },
    disabled: { type: Boolean, required: false },
    name: { type: String, required: false },
    required: { type: Boolean, required: false },
    icon: { type: null, required: false },
    avatar: { type: Object, required: false },
    leading: { type: Boolean, required: false },
    leadingIcon: { type: null, required: false },
    trailing: { type: Boolean, required: false },
    loading: { type: Boolean, required: false },
    loadingIcon: { type: null, required: false }
  },
  emits: ["change", "blur", "focus", "update:modelValue", "update:open"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = vueExports.useSlots();
    const appConfig = useAppConfig();
    const uiProp = useComponentUI("select", props);
    const rootProps = useForwardPropsEmits(reactivePick(props, "open", "defaultOpen", "disabled", "autocomplete", "required", "multiple"), emits);
    const portalProps = usePortal(vueExports.toRef(() => props.portal));
    const { position } = useResolvedVariants("select", props, theme, ["position"], {
      position: () => props.content?.position
    });
    const contentProps = vueExports.toRef(() => defu(props.content, { side: "bottom", sideOffset: 8, collisionPadding: 8, position: position.value }));
    const arrowProps = vueExports.toRef(() => defu(props.arrow, { rounded: true }));
    const { emitFormChange, emitFormInput, emitFormBlur, emitFormFocus, size: formFieldSize, color, id, name, highlight, disabled, ariaAttrs } = useFormField(props);
    const { orientation, size: fieldGroupSize } = useFieldGroup(props);
    const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(vueExports.toRef(() => defu(props, { trailingIcon: appConfig.ui.icons.chevronDown })));
    const selectSize = vueExports.computed(() => fieldGroupSize.value || formFieldSize.value);
    const isItemAligned = vueExports.computed(() => position.value === "item-aligned");
    const ui = vueExports.computed(() => tv({ extend: tv(theme), ...appConfig.ui?.select || {} })({
      color: color.value,
      variant: props.variant,
      size: selectSize?.value,
      loading: props.loading,
      highlight: highlight.value,
      leading: isLeading.value || !!props.avatar || !!slots.leading,
      trailing: isTrailing.value || !!slots.trailing,
      fieldGroup: orientation.value,
      position: position.value
    }));
    const groups = vueExports.computed(
      () => props.items?.length ? isArrayOfArray(props.items) ? props.items : [props.items] : []
    );
    const items = vueExports.computed(() => groups.value.flatMap((group) => group));
    function displayValue(value) {
      if (props.multiple && Array.isArray(value)) {
        const displayedValues = value.map((item) => getDisplayValue(items.value, item, {
          labelKey: props.labelKey,
          valueKey: props.valueKey
        })).filter((v) => v != null && v !== "");
        return displayedValues.length > 0 ? displayedValues.join(", ") : void 0;
      }
      return getDisplayValue(items.value, value, {
        labelKey: props.labelKey,
        valueKey: props.valueKey
      });
    }
    const triggerRef = vueExports.useTemplateRef("triggerRef");
    function onUpdate(value) {
      if (props.modelModifiers?.trim && (typeof value === "string" || value === null || value === void 0)) {
        value = value?.trim() ?? null;
      }
      if (props.modelModifiers?.number) {
        value = looseToNumber(value);
      }
      if (props.modelModifiers?.nullable) {
        value ??= null;
      }
      if (props.modelModifiers?.optional && !props.modelModifiers?.nullable && value !== null) {
        value ??= void 0;
      }
      const event = new Event("change", { target: { value } });
      emits("change", event);
      emitFormChange();
      emitFormInput();
    }
    function onUpdateOpen(value) {
      if (!value) {
        const event = new FocusEvent("blur");
        emits("blur", event);
        emitFormBlur();
      } else {
        const event = new FocusEvent("focus");
        emits("focus", event);
        emitFormFocus();
      }
    }
    function isSelectItem(item) {
      return typeof item === "object" && item !== null;
    }
    const viewportRef = vueExports.useTemplateRef("viewportRef");
    __expose({
      triggerRef: vueExports.toRef(() => triggerRef.value?.$el),
      viewportRef: vueExports.toRef(() => {
        const instance = viewportRef.value;
        return instance && typeof instance === "object" && "$el" in instance ? instance.$el : instance;
      })
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(SelectRoot_default), vueExports.mergeProps({ name: vueExports.unref(name) }, vueExports.unref(rootProps), {
        autocomplete: __props.autocomplete,
        disabled: vueExports.unref(disabled),
        "default-value": __props.defaultValue,
        "model-value": __props.modelValue,
        "onUpdate:modelValue": onUpdate,
        "onUpdate:open": onUpdateOpen
      }, _attrs), {
        default: vueExports.withCtx(({ modelValue, open }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(SelectTrigger_default), vueExports.mergeProps({
              id: vueExports.unref(id),
              ref_key: "triggerRef",
              ref: triggerRef,
              "data-slot": "base",
              class: ui.value.base({ class: [vueExports.unref(uiProp)?.base, props.class] })
            }, { ..._ctx.$attrs, ...vueExports.unref(ariaAttrs) }), {
              default: vueExports.withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (vueExports.unref(isLeading) || !!__props.avatar || !!slots.leading) {
                    _push3(`<span data-slot="leading" class="${serverRenderer_cjs_prodExports.ssrRenderClass(ui.value.leading({ class: vueExports.unref(uiProp)?.leading }))}"${_scopeId2}>`);
                    serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "leading", {
                      modelValue,
                      open,
                      ui: ui.value
                    }, () => {
                      if (vueExports.unref(isLeading) && vueExports.unref(leadingIconName)) {
                        _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$d, {
                          name: vueExports.unref(leadingIconName),
                          "data-slot": "leadingIcon",
                          class: ui.value.leadingIcon({ class: vueExports.unref(uiProp)?.leadingIcon })
                        }, null, _parent3, _scopeId2));
                      } else if (!!__props.avatar) {
                        _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$b, vueExports.mergeProps({
                          size: vueExports.unref(uiProp)?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                        }, __props.avatar, {
                          "data-slot": "itemLeadingAvatar",
                          class: ui.value.itemLeadingAvatar({ class: vueExports.unref(uiProp)?.itemLeadingAvatar })
                        }), null, _parent3, _scopeId2));
                      } else {
                        _push3(`<!---->`);
                      }
                    }, _push3, _parent3, _scopeId2);
                    _push3(`</span>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<!--[-->`);
                  serverRenderer_cjs_prodExports.ssrRenderList([displayValue(modelValue)], (displayedModelValue) => {
                    _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(SelectValue_default), {
                      "data-slot": displayedModelValue != null ? "value" : "placeholder",
                      class: displayedModelValue != null ? ui.value.value({ class: vueExports.unref(uiProp)?.value }) : ui.value.placeholder({ class: vueExports.unref(uiProp)?.placeholder })
                    }, {
                      default: vueExports.withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "default", {
                            modelValue,
                            open,
                            ui: ui.value
                          }, () => {
                            _push4(`${serverRenderer_cjs_prodExports.ssrInterpolate(displayedModelValue ?? (__props.placeholder ?? " "))}`);
                          }, _push4, _parent4, _scopeId3);
                        } else {
                          return [
                            vueExports.renderSlot(_ctx.$slots, "default", {
                              modelValue,
                              open,
                              ui: ui.value
                            }, () => [
                              vueExports.createTextVNode(vueExports.toDisplayString(displayedModelValue ?? (__props.placeholder ?? " ")), 1)
                            ])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                  if (vueExports.unref(isTrailing) || !!slots.trailing) {
                    _push3(`<span data-slot="trailing" class="${serverRenderer_cjs_prodExports.ssrRenderClass(ui.value.trailing({ class: vueExports.unref(uiProp)?.trailing }))}"${_scopeId2}>`);
                    serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "trailing", {
                      modelValue,
                      open,
                      ui: ui.value
                    }, () => {
                      if (vueExports.unref(trailingIconName)) {
                        _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$d, {
                          name: vueExports.unref(trailingIconName),
                          "data-slot": "trailingIcon",
                          class: ui.value.trailingIcon({ class: vueExports.unref(uiProp)?.trailingIcon })
                        }, null, _parent3, _scopeId2));
                      } else {
                        _push3(`<!---->`);
                      }
                    }, _push3, _parent3, _scopeId2);
                    _push3(`</span>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    vueExports.unref(isLeading) || !!__props.avatar || !!slots.leading ? (vueExports.openBlock(), vueExports.createBlock("span", {
                      key: 0,
                      "data-slot": "leading",
                      class: ui.value.leading({ class: vueExports.unref(uiProp)?.leading })
                    }, [
                      vueExports.renderSlot(_ctx.$slots, "leading", {
                        modelValue,
                        open,
                        ui: ui.value
                      }, () => [
                        vueExports.unref(isLeading) && vueExports.unref(leadingIconName) ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                          key: 0,
                          name: vueExports.unref(leadingIconName),
                          "data-slot": "leadingIcon",
                          class: ui.value.leadingIcon({ class: vueExports.unref(uiProp)?.leadingIcon })
                        }, null, 8, ["name", "class"])) : !!__props.avatar ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$b, vueExports.mergeProps({
                          key: 1,
                          size: vueExports.unref(uiProp)?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                        }, __props.avatar, {
                          "data-slot": "itemLeadingAvatar",
                          class: ui.value.itemLeadingAvatar({ class: vueExports.unref(uiProp)?.itemLeadingAvatar })
                        }), null, 16, ["size", "class"])) : vueExports.createCommentVNode("", true)
                      ])
                    ], 2)) : vueExports.createCommentVNode("", true),
                    (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList([displayValue(modelValue)], (displayedModelValue) => {
                      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(SelectValue_default), {
                        key: displayedModelValue,
                        "data-slot": displayedModelValue != null ? "value" : "placeholder",
                        class: displayedModelValue != null ? ui.value.value({ class: vueExports.unref(uiProp)?.value }) : ui.value.placeholder({ class: vueExports.unref(uiProp)?.placeholder })
                      }, {
                        default: vueExports.withCtx(() => [
                          vueExports.renderSlot(_ctx.$slots, "default", {
                            modelValue,
                            open,
                            ui: ui.value
                          }, () => [
                            vueExports.createTextVNode(vueExports.toDisplayString(displayedModelValue ?? (__props.placeholder ?? " ")), 1)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["data-slot", "class"]);
                    }), 128)),
                    vueExports.unref(isTrailing) || !!slots.trailing ? (vueExports.openBlock(), vueExports.createBlock("span", {
                      key: 1,
                      "data-slot": "trailing",
                      class: ui.value.trailing({ class: vueExports.unref(uiProp)?.trailing })
                    }, [
                      vueExports.renderSlot(_ctx.$slots, "trailing", {
                        modelValue,
                        open,
                        ui: ui.value
                      }, () => [
                        vueExports.unref(trailingIconName) ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                          key: 0,
                          name: vueExports.unref(trailingIconName),
                          "data-slot": "trailingIcon",
                          class: ui.value.trailingIcon({ class: vueExports.unref(uiProp)?.trailingIcon })
                        }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                      ])
                    ], 2)) : vueExports.createCommentVNode("", true)
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(SelectPortal_default), vueExports.unref(portalProps), {
              default: vueExports.withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(FieldGroupReset), null, {
                    default: vueExports.withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(SelectContent_default), vueExports.mergeProps({
                          "data-slot": "content",
                          class: ui.value.content({ class: vueExports.unref(uiProp)?.content })
                        }, contentProps.value), {
                          default: vueExports.withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "content-top", {}, null, _push5, _parent5, _scopeId4);
                              serverRenderer_cjs_prodExports.ssrRenderVNode(_push5, vueExports.createVNode(vueExports.resolveDynamicComponent(isItemAligned.value ? vueExports.unref(SelectViewport_default) : "div"), {
                                ref_key: "viewportRef",
                                ref: viewportRef,
                                role: "presentation",
                                "data-slot": "viewport",
                                class: ui.value.viewport({ class: vueExports.unref(uiProp)?.viewport })
                              }, {
                                default: vueExports.withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<!--[-->`);
                                    serverRenderer_cjs_prodExports.ssrRenderList(groups.value, (group, groupIndex) => {
                                      _push6(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(SelectGroup_default), {
                                        key: `group-${groupIndex}`,
                                        "data-slot": "group",
                                        class: ui.value.group({ class: vueExports.unref(uiProp)?.group })
                                      }, {
                                        default: vueExports.withCtx((_5, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`<!--[-->`);
                                            serverRenderer_cjs_prodExports.ssrRenderList(group, (item, index) => {
                                              _push7(`<!--[-->`);
                                              if (isSelectItem(item) && item.type === "label") {
                                                _push7(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(SelectLabel_default), {
                                                  "data-slot": "label",
                                                  class: ui.value.label({ class: [vueExports.unref(uiProp)?.label, item.ui?.label, item.class] })
                                                }, {
                                                  default: vueExports.withCtx((_6, _push8, _parent8, _scopeId7) => {
                                                    if (_push8) {
                                                      _push8(`${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(get)(item, props.labelKey))}`);
                                                    } else {
                                                      return [
                                                        vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get)(item, props.labelKey)), 1)
                                                      ];
                                                    }
                                                  }),
                                                  _: 2
                                                }, _parent7, _scopeId6));
                                              } else if (isSelectItem(item) && item.type === "separator") {
                                                _push7(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(SelectSeparator_default), {
                                                  "data-slot": "separator",
                                                  class: ui.value.separator({ class: [vueExports.unref(uiProp)?.separator, item.ui?.separator, item.class] })
                                                }, null, _parent7, _scopeId6));
                                              } else {
                                                _push7(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(SelectItem_default), {
                                                  "data-slot": "item",
                                                  class: ui.value.item({ class: [vueExports.unref(uiProp)?.item, isSelectItem(item) && item.ui?.item, isSelectItem(item) && item.class] }),
                                                  disabled: isSelectItem(item) && item.disabled,
                                                  value: isSelectItem(item) ? vueExports.unref(get)(item, props.valueKey) : item,
                                                  onSelect: ($event) => isSelectItem(item) && item.onSelect?.($event)
                                                }, {
                                                  default: vueExports.withCtx((_6, _push8, _parent8, _scopeId7) => {
                                                    if (_push8) {
                                                      serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "item", {
                                                        item,
                                                        index,
                                                        ui: ui.value
                                                      }, () => {
                                                        serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "item-leading", {
                                                          item,
                                                          index,
                                                          ui: ui.value
                                                        }, () => {
                                                          if (isSelectItem(item) && item.icon) {
                                                            _push8(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$d, {
                                                              name: item.icon,
                                                              "data-slot": "itemLeadingIcon",
                                                              class: ui.value.itemLeadingIcon({ class: [vueExports.unref(uiProp)?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
                                                            }, null, _parent8, _scopeId7));
                                                          } else if (isSelectItem(item) && item.avatar) {
                                                            _push8(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$b, vueExports.mergeProps({
                                                              size: item.ui?.itemLeadingAvatarSize || vueExports.unref(uiProp)?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                                                            }, { ref_for: true }, item.avatar, {
                                                              "data-slot": "itemLeadingAvatar",
                                                              class: ui.value.itemLeadingAvatar({ class: [vueExports.unref(uiProp)?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
                                                            }), null, _parent8, _scopeId7));
                                                          } else if (isSelectItem(item) && item.chip) {
                                                            _push8(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$c, vueExports.mergeProps({
                                                              size: item.ui?.itemLeadingChipSize || vueExports.unref(uiProp)?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
                                                              inset: "",
                                                              standalone: ""
                                                            }, { ref_for: true }, item.chip, {
                                                              "data-slot": "itemLeadingChip",
                                                              class: ui.value.itemLeadingChip({ class: [vueExports.unref(uiProp)?.itemLeadingChip, item.ui?.itemLeadingChip] })
                                                            }), null, _parent8, _scopeId7));
                                                          } else {
                                                            _push8(`<!---->`);
                                                          }
                                                        }, _push8, _parent8, _scopeId7);
                                                        _push8(`<span data-slot="itemWrapper" class="${serverRenderer_cjs_prodExports.ssrRenderClass(ui.value.itemWrapper({ class: [vueExports.unref(uiProp)?.itemWrapper, isSelectItem(item) && item.ui?.itemWrapper] }))}"${_scopeId7}>`);
                                                        _push8(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(SelectItemText_default), {
                                                          "data-slot": "itemLabel",
                                                          class: ui.value.itemLabel({ class: [vueExports.unref(uiProp)?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
                                                        }, {
                                                          default: vueExports.withCtx((_7, _push9, _parent9, _scopeId8) => {
                                                            if (_push9) {
                                                              serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "item-label", {
                                                                item,
                                                                index
                                                              }, () => {
                                                                _push9(`${serverRenderer_cjs_prodExports.ssrInterpolate(isSelectItem(item) ? vueExports.unref(get)(item, props.labelKey) : item)}`);
                                                              }, _push9, _parent9, _scopeId8);
                                                            } else {
                                                              return [
                                                                vueExports.renderSlot(_ctx.$slots, "item-label", {
                                                                  item,
                                                                  index
                                                                }, () => [
                                                                  vueExports.createTextVNode(vueExports.toDisplayString(isSelectItem(item) ? vueExports.unref(get)(item, props.labelKey) : item), 1)
                                                                ])
                                                              ];
                                                            }
                                                          }),
                                                          _: 2
                                                        }, _parent8, _scopeId7));
                                                        if (isSelectItem(item) && (vueExports.unref(get)(item, props.descriptionKey) || !!slots["item-description"])) {
                                                          _push8(`<span data-slot="itemDescription" class="${serverRenderer_cjs_prodExports.ssrRenderClass(ui.value.itemDescription({ class: [vueExports.unref(uiProp)?.itemDescription, isSelectItem(item) && item.ui?.itemDescription] }))}"${_scopeId7}>`);
                                                          serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "item-description", {
                                                            item,
                                                            index
                                                          }, () => {
                                                            _push8(`${serverRenderer_cjs_prodExports.ssrInterpolate(vueExports.unref(get)(item, props.descriptionKey))}`);
                                                          }, _push8, _parent8, _scopeId7);
                                                          _push8(`</span>`);
                                                        } else {
                                                          _push8(`<!---->`);
                                                        }
                                                        _push8(`</span><span data-slot="itemTrailing" class="${serverRenderer_cjs_prodExports.ssrRenderClass(ui.value.itemTrailing({ class: [vueExports.unref(uiProp)?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] }))}"${_scopeId7}>`);
                                                        serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "item-trailing", {
                                                          item,
                                                          index,
                                                          ui: ui.value
                                                        }, null, _push8, _parent8, _scopeId7);
                                                        _push8(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(SelectItemIndicator_default), { "as-child": "" }, {
                                                          default: vueExports.withCtx((_7, _push9, _parent9, _scopeId8) => {
                                                            if (_push9) {
                                                              _push9(serverRenderer_cjs_prodExports.ssrRenderComponent(_sfc_main$d, {
                                                                name: __props.selectedIcon || vueExports.unref(appConfig).ui.icons.check,
                                                                "data-slot": "itemTrailingIcon",
                                                                class: ui.value.itemTrailingIcon({ class: [vueExports.unref(uiProp)?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
                                                              }, null, _parent9, _scopeId8));
                                                            } else {
                                                              return [
                                                                vueExports.createVNode(_sfc_main$d, {
                                                                  name: __props.selectedIcon || vueExports.unref(appConfig).ui.icons.check,
                                                                  "data-slot": "itemTrailingIcon",
                                                                  class: ui.value.itemTrailingIcon({ class: [vueExports.unref(uiProp)?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
                                                                }, null, 8, ["name", "class"])
                                                              ];
                                                            }
                                                          }),
                                                          _: 2
                                                        }, _parent8, _scopeId7));
                                                        _push8(`</span>`);
                                                      }, _push8, _parent8, _scopeId7);
                                                    } else {
                                                      return [
                                                        vueExports.renderSlot(_ctx.$slots, "item", {
                                                          item,
                                                          index,
                                                          ui: ui.value
                                                        }, () => [
                                                          vueExports.renderSlot(_ctx.$slots, "item-leading", {
                                                            item,
                                                            index,
                                                            ui: ui.value
                                                          }, () => [
                                                            isSelectItem(item) && item.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                                                              key: 0,
                                                              name: item.icon,
                                                              "data-slot": "itemLeadingIcon",
                                                              class: ui.value.itemLeadingIcon({ class: [vueExports.unref(uiProp)?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
                                                            }, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$b, vueExports.mergeProps({
                                                              key: 1,
                                                              size: item.ui?.itemLeadingAvatarSize || vueExports.unref(uiProp)?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                                                            }, { ref_for: true }, item.avatar, {
                                                              "data-slot": "itemLeadingAvatar",
                                                              class: ui.value.itemLeadingAvatar({ class: [vueExports.unref(uiProp)?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
                                                            }), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$c, vueExports.mergeProps({
                                                              key: 2,
                                                              size: item.ui?.itemLeadingChipSize || vueExports.unref(uiProp)?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
                                                              inset: "",
                                                              standalone: ""
                                                            }, { ref_for: true }, item.chip, {
                                                              "data-slot": "itemLeadingChip",
                                                              class: ui.value.itemLeadingChip({ class: [vueExports.unref(uiProp)?.itemLeadingChip, item.ui?.itemLeadingChip] })
                                                            }), null, 16, ["size", "class"])) : vueExports.createCommentVNode("", true)
                                                          ]),
                                                          vueExports.createVNode("span", {
                                                            "data-slot": "itemWrapper",
                                                            class: ui.value.itemWrapper({ class: [vueExports.unref(uiProp)?.itemWrapper, isSelectItem(item) && item.ui?.itemWrapper] })
                                                          }, [
                                                            vueExports.createVNode(vueExports.unref(SelectItemText_default), {
                                                              "data-slot": "itemLabel",
                                                              class: ui.value.itemLabel({ class: [vueExports.unref(uiProp)?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
                                                            }, {
                                                              default: vueExports.withCtx(() => [
                                                                vueExports.renderSlot(_ctx.$slots, "item-label", {
                                                                  item,
                                                                  index
                                                                }, () => [
                                                                  vueExports.createTextVNode(vueExports.toDisplayString(isSelectItem(item) ? vueExports.unref(get)(item, props.labelKey) : item), 1)
                                                                ])
                                                              ]),
                                                              _: 2
                                                            }, 1032, ["class"]),
                                                            isSelectItem(item) && (vueExports.unref(get)(item, props.descriptionKey) || !!slots["item-description"]) ? (vueExports.openBlock(), vueExports.createBlock("span", {
                                                              key: 0,
                                                              "data-slot": "itemDescription",
                                                              class: ui.value.itemDescription({ class: [vueExports.unref(uiProp)?.itemDescription, isSelectItem(item) && item.ui?.itemDescription] })
                                                            }, [
                                                              vueExports.renderSlot(_ctx.$slots, "item-description", {
                                                                item,
                                                                index
                                                              }, () => [
                                                                vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get)(item, props.descriptionKey)), 1)
                                                              ])
                                                            ], 2)) : vueExports.createCommentVNode("", true)
                                                          ], 2),
                                                          vueExports.createVNode("span", {
                                                            "data-slot": "itemTrailing",
                                                            class: ui.value.itemTrailing({ class: [vueExports.unref(uiProp)?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] })
                                                          }, [
                                                            vueExports.renderSlot(_ctx.$slots, "item-trailing", {
                                                              item,
                                                              index,
                                                              ui: ui.value
                                                            }),
                                                            vueExports.createVNode(vueExports.unref(SelectItemIndicator_default), { "as-child": "" }, {
                                                              default: vueExports.withCtx(() => [
                                                                vueExports.createVNode(_sfc_main$d, {
                                                                  name: __props.selectedIcon || vueExports.unref(appConfig).ui.icons.check,
                                                                  "data-slot": "itemTrailingIcon",
                                                                  class: ui.value.itemTrailingIcon({ class: [vueExports.unref(uiProp)?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
                                                                }, null, 8, ["name", "class"])
                                                              ]),
                                                              _: 2
                                                            }, 1024)
                                                          ], 2)
                                                        ])
                                                      ];
                                                    }
                                                  }),
                                                  _: 2
                                                }, _parent7, _scopeId6));
                                              }
                                              _push7(`<!--]-->`);
                                            });
                                            _push7(`<!--]-->`);
                                          } else {
                                            return [
                                              (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(group, (item, index) => {
                                                return vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, {
                                                  key: `group-${groupIndex}-${index}`
                                                }, [
                                                  isSelectItem(item) && item.type === "label" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(SelectLabel_default), {
                                                    key: 0,
                                                    "data-slot": "label",
                                                    class: ui.value.label({ class: [vueExports.unref(uiProp)?.label, item.ui?.label, item.class] })
                                                  }, {
                                                    default: vueExports.withCtx(() => [
                                                      vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get)(item, props.labelKey)), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["class"])) : isSelectItem(item) && item.type === "separator" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(SelectSeparator_default), {
                                                    key: 1,
                                                    "data-slot": "separator",
                                                    class: ui.value.separator({ class: [vueExports.unref(uiProp)?.separator, item.ui?.separator, item.class] })
                                                  }, null, 8, ["class"])) : (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(SelectItem_default), {
                                                    key: 2,
                                                    "data-slot": "item",
                                                    class: ui.value.item({ class: [vueExports.unref(uiProp)?.item, isSelectItem(item) && item.ui?.item, isSelectItem(item) && item.class] }),
                                                    disabled: isSelectItem(item) && item.disabled,
                                                    value: isSelectItem(item) ? vueExports.unref(get)(item, props.valueKey) : item,
                                                    onSelect: ($event) => isSelectItem(item) && item.onSelect?.($event)
                                                  }, {
                                                    default: vueExports.withCtx(() => [
                                                      vueExports.renderSlot(_ctx.$slots, "item", {
                                                        item,
                                                        index,
                                                        ui: ui.value
                                                      }, () => [
                                                        vueExports.renderSlot(_ctx.$slots, "item-leading", {
                                                          item,
                                                          index,
                                                          ui: ui.value
                                                        }, () => [
                                                          isSelectItem(item) && item.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                                                            key: 0,
                                                            name: item.icon,
                                                            "data-slot": "itemLeadingIcon",
                                                            class: ui.value.itemLeadingIcon({ class: [vueExports.unref(uiProp)?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
                                                          }, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$b, vueExports.mergeProps({
                                                            key: 1,
                                                            size: item.ui?.itemLeadingAvatarSize || vueExports.unref(uiProp)?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                                                          }, { ref_for: true }, item.avatar, {
                                                            "data-slot": "itemLeadingAvatar",
                                                            class: ui.value.itemLeadingAvatar({ class: [vueExports.unref(uiProp)?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
                                                          }), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$c, vueExports.mergeProps({
                                                            key: 2,
                                                            size: item.ui?.itemLeadingChipSize || vueExports.unref(uiProp)?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
                                                            inset: "",
                                                            standalone: ""
                                                          }, { ref_for: true }, item.chip, {
                                                            "data-slot": "itemLeadingChip",
                                                            class: ui.value.itemLeadingChip({ class: [vueExports.unref(uiProp)?.itemLeadingChip, item.ui?.itemLeadingChip] })
                                                          }), null, 16, ["size", "class"])) : vueExports.createCommentVNode("", true)
                                                        ]),
                                                        vueExports.createVNode("span", {
                                                          "data-slot": "itemWrapper",
                                                          class: ui.value.itemWrapper({ class: [vueExports.unref(uiProp)?.itemWrapper, isSelectItem(item) && item.ui?.itemWrapper] })
                                                        }, [
                                                          vueExports.createVNode(vueExports.unref(SelectItemText_default), {
                                                            "data-slot": "itemLabel",
                                                            class: ui.value.itemLabel({ class: [vueExports.unref(uiProp)?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
                                                          }, {
                                                            default: vueExports.withCtx(() => [
                                                              vueExports.renderSlot(_ctx.$slots, "item-label", {
                                                                item,
                                                                index
                                                              }, () => [
                                                                vueExports.createTextVNode(vueExports.toDisplayString(isSelectItem(item) ? vueExports.unref(get)(item, props.labelKey) : item), 1)
                                                              ])
                                                            ]),
                                                            _: 2
                                                          }, 1032, ["class"]),
                                                          isSelectItem(item) && (vueExports.unref(get)(item, props.descriptionKey) || !!slots["item-description"]) ? (vueExports.openBlock(), vueExports.createBlock("span", {
                                                            key: 0,
                                                            "data-slot": "itemDescription",
                                                            class: ui.value.itemDescription({ class: [vueExports.unref(uiProp)?.itemDescription, isSelectItem(item) && item.ui?.itemDescription] })
                                                          }, [
                                                            vueExports.renderSlot(_ctx.$slots, "item-description", {
                                                              item,
                                                              index
                                                            }, () => [
                                                              vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get)(item, props.descriptionKey)), 1)
                                                            ])
                                                          ], 2)) : vueExports.createCommentVNode("", true)
                                                        ], 2),
                                                        vueExports.createVNode("span", {
                                                          "data-slot": "itemTrailing",
                                                          class: ui.value.itemTrailing({ class: [vueExports.unref(uiProp)?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] })
                                                        }, [
                                                          vueExports.renderSlot(_ctx.$slots, "item-trailing", {
                                                            item,
                                                            index,
                                                            ui: ui.value
                                                          }),
                                                          vueExports.createVNode(vueExports.unref(SelectItemIndicator_default), { "as-child": "" }, {
                                                            default: vueExports.withCtx(() => [
                                                              vueExports.createVNode(_sfc_main$d, {
                                                                name: __props.selectedIcon || vueExports.unref(appConfig).ui.icons.check,
                                                                "data-slot": "itemTrailingIcon",
                                                                class: ui.value.itemTrailingIcon({ class: [vueExports.unref(uiProp)?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
                                                              }, null, 8, ["name", "class"])
                                                            ]),
                                                            _: 2
                                                          }, 1024)
                                                        ], 2)
                                                      ])
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["class", "disabled", "value", "onSelect"]))
                                                ], 64);
                                              }), 128))
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    });
                                    _push6(`<!--]-->`);
                                  } else {
                                    return [
                                      (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(groups.value, (group, groupIndex) => {
                                        return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(SelectGroup_default), {
                                          key: `group-${groupIndex}`,
                                          "data-slot": "group",
                                          class: ui.value.group({ class: vueExports.unref(uiProp)?.group })
                                        }, {
                                          default: vueExports.withCtx(() => [
                                            (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(group, (item, index) => {
                                              return vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, {
                                                key: `group-${groupIndex}-${index}`
                                              }, [
                                                isSelectItem(item) && item.type === "label" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(SelectLabel_default), {
                                                  key: 0,
                                                  "data-slot": "label",
                                                  class: ui.value.label({ class: [vueExports.unref(uiProp)?.label, item.ui?.label, item.class] })
                                                }, {
                                                  default: vueExports.withCtx(() => [
                                                    vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get)(item, props.labelKey)), 1)
                                                  ]),
                                                  _: 2
                                                }, 1032, ["class"])) : isSelectItem(item) && item.type === "separator" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(SelectSeparator_default), {
                                                  key: 1,
                                                  "data-slot": "separator",
                                                  class: ui.value.separator({ class: [vueExports.unref(uiProp)?.separator, item.ui?.separator, item.class] })
                                                }, null, 8, ["class"])) : (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(SelectItem_default), {
                                                  key: 2,
                                                  "data-slot": "item",
                                                  class: ui.value.item({ class: [vueExports.unref(uiProp)?.item, isSelectItem(item) && item.ui?.item, isSelectItem(item) && item.class] }),
                                                  disabled: isSelectItem(item) && item.disabled,
                                                  value: isSelectItem(item) ? vueExports.unref(get)(item, props.valueKey) : item,
                                                  onSelect: ($event) => isSelectItem(item) && item.onSelect?.($event)
                                                }, {
                                                  default: vueExports.withCtx(() => [
                                                    vueExports.renderSlot(_ctx.$slots, "item", {
                                                      item,
                                                      index,
                                                      ui: ui.value
                                                    }, () => [
                                                      vueExports.renderSlot(_ctx.$slots, "item-leading", {
                                                        item,
                                                        index,
                                                        ui: ui.value
                                                      }, () => [
                                                        isSelectItem(item) && item.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                                                          key: 0,
                                                          name: item.icon,
                                                          "data-slot": "itemLeadingIcon",
                                                          class: ui.value.itemLeadingIcon({ class: [vueExports.unref(uiProp)?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
                                                        }, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$b, vueExports.mergeProps({
                                                          key: 1,
                                                          size: item.ui?.itemLeadingAvatarSize || vueExports.unref(uiProp)?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                                                        }, { ref_for: true }, item.avatar, {
                                                          "data-slot": "itemLeadingAvatar",
                                                          class: ui.value.itemLeadingAvatar({ class: [vueExports.unref(uiProp)?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
                                                        }), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$c, vueExports.mergeProps({
                                                          key: 2,
                                                          size: item.ui?.itemLeadingChipSize || vueExports.unref(uiProp)?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
                                                          inset: "",
                                                          standalone: ""
                                                        }, { ref_for: true }, item.chip, {
                                                          "data-slot": "itemLeadingChip",
                                                          class: ui.value.itemLeadingChip({ class: [vueExports.unref(uiProp)?.itemLeadingChip, item.ui?.itemLeadingChip] })
                                                        }), null, 16, ["size", "class"])) : vueExports.createCommentVNode("", true)
                                                      ]),
                                                      vueExports.createVNode("span", {
                                                        "data-slot": "itemWrapper",
                                                        class: ui.value.itemWrapper({ class: [vueExports.unref(uiProp)?.itemWrapper, isSelectItem(item) && item.ui?.itemWrapper] })
                                                      }, [
                                                        vueExports.createVNode(vueExports.unref(SelectItemText_default), {
                                                          "data-slot": "itemLabel",
                                                          class: ui.value.itemLabel({ class: [vueExports.unref(uiProp)?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
                                                        }, {
                                                          default: vueExports.withCtx(() => [
                                                            vueExports.renderSlot(_ctx.$slots, "item-label", {
                                                              item,
                                                              index
                                                            }, () => [
                                                              vueExports.createTextVNode(vueExports.toDisplayString(isSelectItem(item) ? vueExports.unref(get)(item, props.labelKey) : item), 1)
                                                            ])
                                                          ]),
                                                          _: 2
                                                        }, 1032, ["class"]),
                                                        isSelectItem(item) && (vueExports.unref(get)(item, props.descriptionKey) || !!slots["item-description"]) ? (vueExports.openBlock(), vueExports.createBlock("span", {
                                                          key: 0,
                                                          "data-slot": "itemDescription",
                                                          class: ui.value.itemDescription({ class: [vueExports.unref(uiProp)?.itemDescription, isSelectItem(item) && item.ui?.itemDescription] })
                                                        }, [
                                                          vueExports.renderSlot(_ctx.$slots, "item-description", {
                                                            item,
                                                            index
                                                          }, () => [
                                                            vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get)(item, props.descriptionKey)), 1)
                                                          ])
                                                        ], 2)) : vueExports.createCommentVNode("", true)
                                                      ], 2),
                                                      vueExports.createVNode("span", {
                                                        "data-slot": "itemTrailing",
                                                        class: ui.value.itemTrailing({ class: [vueExports.unref(uiProp)?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] })
                                                      }, [
                                                        vueExports.renderSlot(_ctx.$slots, "item-trailing", {
                                                          item,
                                                          index,
                                                          ui: ui.value
                                                        }),
                                                        vueExports.createVNode(vueExports.unref(SelectItemIndicator_default), { "as-child": "" }, {
                                                          default: vueExports.withCtx(() => [
                                                            vueExports.createVNode(_sfc_main$d, {
                                                              name: __props.selectedIcon || vueExports.unref(appConfig).ui.icons.check,
                                                              "data-slot": "itemTrailingIcon",
                                                              class: ui.value.itemTrailingIcon({ class: [vueExports.unref(uiProp)?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
                                                            }, null, 8, ["name", "class"])
                                                          ]),
                                                          _: 2
                                                        }, 1024)
                                                      ], 2)
                                                    ])
                                                  ]),
                                                  _: 2
                                                }, 1032, ["class", "disabled", "value", "onSelect"]))
                                              ], 64);
                                            }), 128))
                                          ]),
                                          _: 2
                                        }, 1032, ["class"]);
                                      }), 128))
                                    ];
                                  }
                                }),
                                _: 2
                              }), _parent5, _scopeId4);
                              serverRenderer_cjs_prodExports.ssrRenderSlot(_ctx.$slots, "content-bottom", {}, null, _push5, _parent5, _scopeId4);
                              if (!!__props.arrow) {
                                _push5(serverRenderer_cjs_prodExports.ssrRenderComponent(vueExports.unref(SelectArrow_default), vueExports.mergeProps(arrowProps.value, {
                                  "data-slot": "arrow",
                                  class: ui.value.arrow({ class: vueExports.unref(uiProp)?.arrow })
                                }), null, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                            } else {
                              return [
                                vueExports.renderSlot(_ctx.$slots, "content-top"),
                                (vueExports.openBlock(), vueExports.createBlock(vueExports.resolveDynamicComponent(isItemAligned.value ? vueExports.unref(SelectViewport_default) : "div"), {
                                  ref_key: "viewportRef",
                                  ref: viewportRef,
                                  role: "presentation",
                                  "data-slot": "viewport",
                                  class: ui.value.viewport({ class: vueExports.unref(uiProp)?.viewport })
                                }, {
                                  default: vueExports.withCtx(() => [
                                    (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(groups.value, (group, groupIndex) => {
                                      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(SelectGroup_default), {
                                        key: `group-${groupIndex}`,
                                        "data-slot": "group",
                                        class: ui.value.group({ class: vueExports.unref(uiProp)?.group })
                                      }, {
                                        default: vueExports.withCtx(() => [
                                          (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(group, (item, index) => {
                                            return vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, {
                                              key: `group-${groupIndex}-${index}`
                                            }, [
                                              isSelectItem(item) && item.type === "label" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(SelectLabel_default), {
                                                key: 0,
                                                "data-slot": "label",
                                                class: ui.value.label({ class: [vueExports.unref(uiProp)?.label, item.ui?.label, item.class] })
                                              }, {
                                                default: vueExports.withCtx(() => [
                                                  vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get)(item, props.labelKey)), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["class"])) : isSelectItem(item) && item.type === "separator" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(SelectSeparator_default), {
                                                key: 1,
                                                "data-slot": "separator",
                                                class: ui.value.separator({ class: [vueExports.unref(uiProp)?.separator, item.ui?.separator, item.class] })
                                              }, null, 8, ["class"])) : (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(SelectItem_default), {
                                                key: 2,
                                                "data-slot": "item",
                                                class: ui.value.item({ class: [vueExports.unref(uiProp)?.item, isSelectItem(item) && item.ui?.item, isSelectItem(item) && item.class] }),
                                                disabled: isSelectItem(item) && item.disabled,
                                                value: isSelectItem(item) ? vueExports.unref(get)(item, props.valueKey) : item,
                                                onSelect: ($event) => isSelectItem(item) && item.onSelect?.($event)
                                              }, {
                                                default: vueExports.withCtx(() => [
                                                  vueExports.renderSlot(_ctx.$slots, "item", {
                                                    item,
                                                    index,
                                                    ui: ui.value
                                                  }, () => [
                                                    vueExports.renderSlot(_ctx.$slots, "item-leading", {
                                                      item,
                                                      index,
                                                      ui: ui.value
                                                    }, () => [
                                                      isSelectItem(item) && item.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                                                        key: 0,
                                                        name: item.icon,
                                                        "data-slot": "itemLeadingIcon",
                                                        class: ui.value.itemLeadingIcon({ class: [vueExports.unref(uiProp)?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
                                                      }, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$b, vueExports.mergeProps({
                                                        key: 1,
                                                        size: item.ui?.itemLeadingAvatarSize || vueExports.unref(uiProp)?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                                                      }, { ref_for: true }, item.avatar, {
                                                        "data-slot": "itemLeadingAvatar",
                                                        class: ui.value.itemLeadingAvatar({ class: [vueExports.unref(uiProp)?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
                                                      }), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$c, vueExports.mergeProps({
                                                        key: 2,
                                                        size: item.ui?.itemLeadingChipSize || vueExports.unref(uiProp)?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
                                                        inset: "",
                                                        standalone: ""
                                                      }, { ref_for: true }, item.chip, {
                                                        "data-slot": "itemLeadingChip",
                                                        class: ui.value.itemLeadingChip({ class: [vueExports.unref(uiProp)?.itemLeadingChip, item.ui?.itemLeadingChip] })
                                                      }), null, 16, ["size", "class"])) : vueExports.createCommentVNode("", true)
                                                    ]),
                                                    vueExports.createVNode("span", {
                                                      "data-slot": "itemWrapper",
                                                      class: ui.value.itemWrapper({ class: [vueExports.unref(uiProp)?.itemWrapper, isSelectItem(item) && item.ui?.itemWrapper] })
                                                    }, [
                                                      vueExports.createVNode(vueExports.unref(SelectItemText_default), {
                                                        "data-slot": "itemLabel",
                                                        class: ui.value.itemLabel({ class: [vueExports.unref(uiProp)?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
                                                      }, {
                                                        default: vueExports.withCtx(() => [
                                                          vueExports.renderSlot(_ctx.$slots, "item-label", {
                                                            item,
                                                            index
                                                          }, () => [
                                                            vueExports.createTextVNode(vueExports.toDisplayString(isSelectItem(item) ? vueExports.unref(get)(item, props.labelKey) : item), 1)
                                                          ])
                                                        ]),
                                                        _: 2
                                                      }, 1032, ["class"]),
                                                      isSelectItem(item) && (vueExports.unref(get)(item, props.descriptionKey) || !!slots["item-description"]) ? (vueExports.openBlock(), vueExports.createBlock("span", {
                                                        key: 0,
                                                        "data-slot": "itemDescription",
                                                        class: ui.value.itemDescription({ class: [vueExports.unref(uiProp)?.itemDescription, isSelectItem(item) && item.ui?.itemDescription] })
                                                      }, [
                                                        vueExports.renderSlot(_ctx.$slots, "item-description", {
                                                          item,
                                                          index
                                                        }, () => [
                                                          vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get)(item, props.descriptionKey)), 1)
                                                        ])
                                                      ], 2)) : vueExports.createCommentVNode("", true)
                                                    ], 2),
                                                    vueExports.createVNode("span", {
                                                      "data-slot": "itemTrailing",
                                                      class: ui.value.itemTrailing({ class: [vueExports.unref(uiProp)?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] })
                                                    }, [
                                                      vueExports.renderSlot(_ctx.$slots, "item-trailing", {
                                                        item,
                                                        index,
                                                        ui: ui.value
                                                      }),
                                                      vueExports.createVNode(vueExports.unref(SelectItemIndicator_default), { "as-child": "" }, {
                                                        default: vueExports.withCtx(() => [
                                                          vueExports.createVNode(_sfc_main$d, {
                                                            name: __props.selectedIcon || vueExports.unref(appConfig).ui.icons.check,
                                                            "data-slot": "itemTrailingIcon",
                                                            class: ui.value.itemTrailingIcon({ class: [vueExports.unref(uiProp)?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
                                                          }, null, 8, ["name", "class"])
                                                        ]),
                                                        _: 2
                                                      }, 1024)
                                                    ], 2)
                                                  ])
                                                ]),
                                                _: 2
                                              }, 1032, ["class", "disabled", "value", "onSelect"]))
                                            ], 64);
                                          }), 128))
                                        ]),
                                        _: 2
                                      }, 1032, ["class"]);
                                    }), 128))
                                  ]),
                                  _: 3
                                }, 8, ["class"])),
                                vueExports.renderSlot(_ctx.$slots, "content-bottom"),
                                !!__props.arrow ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(SelectArrow_default), vueExports.mergeProps({ key: 0 }, arrowProps.value, {
                                  "data-slot": "arrow",
                                  class: ui.value.arrow({ class: vueExports.unref(uiProp)?.arrow })
                                }), null, 16, ["class"])) : vueExports.createCommentVNode("", true)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          vueExports.createVNode(vueExports.unref(SelectContent_default), vueExports.mergeProps({
                            "data-slot": "content",
                            class: ui.value.content({ class: vueExports.unref(uiProp)?.content })
                          }, contentProps.value), {
                            default: vueExports.withCtx(() => [
                              vueExports.renderSlot(_ctx.$slots, "content-top"),
                              (vueExports.openBlock(), vueExports.createBlock(vueExports.resolveDynamicComponent(isItemAligned.value ? vueExports.unref(SelectViewport_default) : "div"), {
                                ref_key: "viewportRef",
                                ref: viewportRef,
                                role: "presentation",
                                "data-slot": "viewport",
                                class: ui.value.viewport({ class: vueExports.unref(uiProp)?.viewport })
                              }, {
                                default: vueExports.withCtx(() => [
                                  (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(groups.value, (group, groupIndex) => {
                                    return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(SelectGroup_default), {
                                      key: `group-${groupIndex}`,
                                      "data-slot": "group",
                                      class: ui.value.group({ class: vueExports.unref(uiProp)?.group })
                                    }, {
                                      default: vueExports.withCtx(() => [
                                        (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(group, (item, index) => {
                                          return vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, {
                                            key: `group-${groupIndex}-${index}`
                                          }, [
                                            isSelectItem(item) && item.type === "label" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(SelectLabel_default), {
                                              key: 0,
                                              "data-slot": "label",
                                              class: ui.value.label({ class: [vueExports.unref(uiProp)?.label, item.ui?.label, item.class] })
                                            }, {
                                              default: vueExports.withCtx(() => [
                                                vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get)(item, props.labelKey)), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["class"])) : isSelectItem(item) && item.type === "separator" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(SelectSeparator_default), {
                                              key: 1,
                                              "data-slot": "separator",
                                              class: ui.value.separator({ class: [vueExports.unref(uiProp)?.separator, item.ui?.separator, item.class] })
                                            }, null, 8, ["class"])) : (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(SelectItem_default), {
                                              key: 2,
                                              "data-slot": "item",
                                              class: ui.value.item({ class: [vueExports.unref(uiProp)?.item, isSelectItem(item) && item.ui?.item, isSelectItem(item) && item.class] }),
                                              disabled: isSelectItem(item) && item.disabled,
                                              value: isSelectItem(item) ? vueExports.unref(get)(item, props.valueKey) : item,
                                              onSelect: ($event) => isSelectItem(item) && item.onSelect?.($event)
                                            }, {
                                              default: vueExports.withCtx(() => [
                                                vueExports.renderSlot(_ctx.$slots, "item", {
                                                  item,
                                                  index,
                                                  ui: ui.value
                                                }, () => [
                                                  vueExports.renderSlot(_ctx.$slots, "item-leading", {
                                                    item,
                                                    index,
                                                    ui: ui.value
                                                  }, () => [
                                                    isSelectItem(item) && item.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                                                      key: 0,
                                                      name: item.icon,
                                                      "data-slot": "itemLeadingIcon",
                                                      class: ui.value.itemLeadingIcon({ class: [vueExports.unref(uiProp)?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
                                                    }, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$b, vueExports.mergeProps({
                                                      key: 1,
                                                      size: item.ui?.itemLeadingAvatarSize || vueExports.unref(uiProp)?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                                                    }, { ref_for: true }, item.avatar, {
                                                      "data-slot": "itemLeadingAvatar",
                                                      class: ui.value.itemLeadingAvatar({ class: [vueExports.unref(uiProp)?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
                                                    }), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$c, vueExports.mergeProps({
                                                      key: 2,
                                                      size: item.ui?.itemLeadingChipSize || vueExports.unref(uiProp)?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
                                                      inset: "",
                                                      standalone: ""
                                                    }, { ref_for: true }, item.chip, {
                                                      "data-slot": "itemLeadingChip",
                                                      class: ui.value.itemLeadingChip({ class: [vueExports.unref(uiProp)?.itemLeadingChip, item.ui?.itemLeadingChip] })
                                                    }), null, 16, ["size", "class"])) : vueExports.createCommentVNode("", true)
                                                  ]),
                                                  vueExports.createVNode("span", {
                                                    "data-slot": "itemWrapper",
                                                    class: ui.value.itemWrapper({ class: [vueExports.unref(uiProp)?.itemWrapper, isSelectItem(item) && item.ui?.itemWrapper] })
                                                  }, [
                                                    vueExports.createVNode(vueExports.unref(SelectItemText_default), {
                                                      "data-slot": "itemLabel",
                                                      class: ui.value.itemLabel({ class: [vueExports.unref(uiProp)?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
                                                    }, {
                                                      default: vueExports.withCtx(() => [
                                                        vueExports.renderSlot(_ctx.$slots, "item-label", {
                                                          item,
                                                          index
                                                        }, () => [
                                                          vueExports.createTextVNode(vueExports.toDisplayString(isSelectItem(item) ? vueExports.unref(get)(item, props.labelKey) : item), 1)
                                                        ])
                                                      ]),
                                                      _: 2
                                                    }, 1032, ["class"]),
                                                    isSelectItem(item) && (vueExports.unref(get)(item, props.descriptionKey) || !!slots["item-description"]) ? (vueExports.openBlock(), vueExports.createBlock("span", {
                                                      key: 0,
                                                      "data-slot": "itemDescription",
                                                      class: ui.value.itemDescription({ class: [vueExports.unref(uiProp)?.itemDescription, isSelectItem(item) && item.ui?.itemDescription] })
                                                    }, [
                                                      vueExports.renderSlot(_ctx.$slots, "item-description", {
                                                        item,
                                                        index
                                                      }, () => [
                                                        vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get)(item, props.descriptionKey)), 1)
                                                      ])
                                                    ], 2)) : vueExports.createCommentVNode("", true)
                                                  ], 2),
                                                  vueExports.createVNode("span", {
                                                    "data-slot": "itemTrailing",
                                                    class: ui.value.itemTrailing({ class: [vueExports.unref(uiProp)?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] })
                                                  }, [
                                                    vueExports.renderSlot(_ctx.$slots, "item-trailing", {
                                                      item,
                                                      index,
                                                      ui: ui.value
                                                    }),
                                                    vueExports.createVNode(vueExports.unref(SelectItemIndicator_default), { "as-child": "" }, {
                                                      default: vueExports.withCtx(() => [
                                                        vueExports.createVNode(_sfc_main$d, {
                                                          name: __props.selectedIcon || vueExports.unref(appConfig).ui.icons.check,
                                                          "data-slot": "itemTrailingIcon",
                                                          class: ui.value.itemTrailingIcon({ class: [vueExports.unref(uiProp)?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
                                                        }, null, 8, ["name", "class"])
                                                      ]),
                                                      _: 2
                                                    }, 1024)
                                                  ], 2)
                                                ])
                                              ]),
                                              _: 2
                                            }, 1032, ["class", "disabled", "value", "onSelect"]))
                                          ], 64);
                                        }), 128))
                                      ]),
                                      _: 2
                                    }, 1032, ["class"]);
                                  }), 128))
                                ]),
                                _: 3
                              }, 8, ["class"])),
                              vueExports.renderSlot(_ctx.$slots, "content-bottom"),
                              !!__props.arrow ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(SelectArrow_default), vueExports.mergeProps({ key: 0 }, arrowProps.value, {
                                "data-slot": "arrow",
                                class: ui.value.arrow({ class: vueExports.unref(uiProp)?.arrow })
                              }), null, 16, ["class"])) : vueExports.createCommentVNode("", true)
                            ]),
                            _: 3
                          }, 16, ["class"])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    vueExports.createVNode(vueExports.unref(FieldGroupReset), null, {
                      default: vueExports.withCtx(() => [
                        vueExports.createVNode(vueExports.unref(SelectContent_default), vueExports.mergeProps({
                          "data-slot": "content",
                          class: ui.value.content({ class: vueExports.unref(uiProp)?.content })
                        }, contentProps.value), {
                          default: vueExports.withCtx(() => [
                            vueExports.renderSlot(_ctx.$slots, "content-top"),
                            (vueExports.openBlock(), vueExports.createBlock(vueExports.resolveDynamicComponent(isItemAligned.value ? vueExports.unref(SelectViewport_default) : "div"), {
                              ref_key: "viewportRef",
                              ref: viewportRef,
                              role: "presentation",
                              "data-slot": "viewport",
                              class: ui.value.viewport({ class: vueExports.unref(uiProp)?.viewport })
                            }, {
                              default: vueExports.withCtx(() => [
                                (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(groups.value, (group, groupIndex) => {
                                  return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(SelectGroup_default), {
                                    key: `group-${groupIndex}`,
                                    "data-slot": "group",
                                    class: ui.value.group({ class: vueExports.unref(uiProp)?.group })
                                  }, {
                                    default: vueExports.withCtx(() => [
                                      (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(group, (item, index) => {
                                        return vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, {
                                          key: `group-${groupIndex}-${index}`
                                        }, [
                                          isSelectItem(item) && item.type === "label" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(SelectLabel_default), {
                                            key: 0,
                                            "data-slot": "label",
                                            class: ui.value.label({ class: [vueExports.unref(uiProp)?.label, item.ui?.label, item.class] })
                                          }, {
                                            default: vueExports.withCtx(() => [
                                              vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get)(item, props.labelKey)), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["class"])) : isSelectItem(item) && item.type === "separator" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(SelectSeparator_default), {
                                            key: 1,
                                            "data-slot": "separator",
                                            class: ui.value.separator({ class: [vueExports.unref(uiProp)?.separator, item.ui?.separator, item.class] })
                                          }, null, 8, ["class"])) : (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(SelectItem_default), {
                                            key: 2,
                                            "data-slot": "item",
                                            class: ui.value.item({ class: [vueExports.unref(uiProp)?.item, isSelectItem(item) && item.ui?.item, isSelectItem(item) && item.class] }),
                                            disabled: isSelectItem(item) && item.disabled,
                                            value: isSelectItem(item) ? vueExports.unref(get)(item, props.valueKey) : item,
                                            onSelect: ($event) => isSelectItem(item) && item.onSelect?.($event)
                                          }, {
                                            default: vueExports.withCtx(() => [
                                              vueExports.renderSlot(_ctx.$slots, "item", {
                                                item,
                                                index,
                                                ui: ui.value
                                              }, () => [
                                                vueExports.renderSlot(_ctx.$slots, "item-leading", {
                                                  item,
                                                  index,
                                                  ui: ui.value
                                                }, () => [
                                                  isSelectItem(item) && item.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                                                    key: 0,
                                                    name: item.icon,
                                                    "data-slot": "itemLeadingIcon",
                                                    class: ui.value.itemLeadingIcon({ class: [vueExports.unref(uiProp)?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
                                                  }, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$b, vueExports.mergeProps({
                                                    key: 1,
                                                    size: item.ui?.itemLeadingAvatarSize || vueExports.unref(uiProp)?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                                                  }, { ref_for: true }, item.avatar, {
                                                    "data-slot": "itemLeadingAvatar",
                                                    class: ui.value.itemLeadingAvatar({ class: [vueExports.unref(uiProp)?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
                                                  }), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$c, vueExports.mergeProps({
                                                    key: 2,
                                                    size: item.ui?.itemLeadingChipSize || vueExports.unref(uiProp)?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
                                                    inset: "",
                                                    standalone: ""
                                                  }, { ref_for: true }, item.chip, {
                                                    "data-slot": "itemLeadingChip",
                                                    class: ui.value.itemLeadingChip({ class: [vueExports.unref(uiProp)?.itemLeadingChip, item.ui?.itemLeadingChip] })
                                                  }), null, 16, ["size", "class"])) : vueExports.createCommentVNode("", true)
                                                ]),
                                                vueExports.createVNode("span", {
                                                  "data-slot": "itemWrapper",
                                                  class: ui.value.itemWrapper({ class: [vueExports.unref(uiProp)?.itemWrapper, isSelectItem(item) && item.ui?.itemWrapper] })
                                                }, [
                                                  vueExports.createVNode(vueExports.unref(SelectItemText_default), {
                                                    "data-slot": "itemLabel",
                                                    class: ui.value.itemLabel({ class: [vueExports.unref(uiProp)?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
                                                  }, {
                                                    default: vueExports.withCtx(() => [
                                                      vueExports.renderSlot(_ctx.$slots, "item-label", {
                                                        item,
                                                        index
                                                      }, () => [
                                                        vueExports.createTextVNode(vueExports.toDisplayString(isSelectItem(item) ? vueExports.unref(get)(item, props.labelKey) : item), 1)
                                                      ])
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["class"]),
                                                  isSelectItem(item) && (vueExports.unref(get)(item, props.descriptionKey) || !!slots["item-description"]) ? (vueExports.openBlock(), vueExports.createBlock("span", {
                                                    key: 0,
                                                    "data-slot": "itemDescription",
                                                    class: ui.value.itemDescription({ class: [vueExports.unref(uiProp)?.itemDescription, isSelectItem(item) && item.ui?.itemDescription] })
                                                  }, [
                                                    vueExports.renderSlot(_ctx.$slots, "item-description", {
                                                      item,
                                                      index
                                                    }, () => [
                                                      vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get)(item, props.descriptionKey)), 1)
                                                    ])
                                                  ], 2)) : vueExports.createCommentVNode("", true)
                                                ], 2),
                                                vueExports.createVNode("span", {
                                                  "data-slot": "itemTrailing",
                                                  class: ui.value.itemTrailing({ class: [vueExports.unref(uiProp)?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] })
                                                }, [
                                                  vueExports.renderSlot(_ctx.$slots, "item-trailing", {
                                                    item,
                                                    index,
                                                    ui: ui.value
                                                  }),
                                                  vueExports.createVNode(vueExports.unref(SelectItemIndicator_default), { "as-child": "" }, {
                                                    default: vueExports.withCtx(() => [
                                                      vueExports.createVNode(_sfc_main$d, {
                                                        name: __props.selectedIcon || vueExports.unref(appConfig).ui.icons.check,
                                                        "data-slot": "itemTrailingIcon",
                                                        class: ui.value.itemTrailingIcon({ class: [vueExports.unref(uiProp)?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
                                                      }, null, 8, ["name", "class"])
                                                    ]),
                                                    _: 2
                                                  }, 1024)
                                                ], 2)
                                              ])
                                            ]),
                                            _: 2
                                          }, 1032, ["class", "disabled", "value", "onSelect"]))
                                        ], 64);
                                      }), 128))
                                    ]),
                                    _: 2
                                  }, 1032, ["class"]);
                                }), 128))
                              ]),
                              _: 3
                            }, 8, ["class"])),
                            vueExports.renderSlot(_ctx.$slots, "content-bottom"),
                            !!__props.arrow ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(SelectArrow_default), vueExports.mergeProps({ key: 0 }, arrowProps.value, {
                              "data-slot": "arrow",
                              class: ui.value.arrow({ class: vueExports.unref(uiProp)?.arrow })
                            }), null, 16, ["class"])) : vueExports.createCommentVNode("", true)
                          ]),
                          _: 3
                        }, 16, ["class"])
                      ]),
                      _: 3
                    })
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              vueExports.createVNode(vueExports.unref(SelectTrigger_default), vueExports.mergeProps({
                id: vueExports.unref(id),
                ref_key: "triggerRef",
                ref: triggerRef,
                "data-slot": "base",
                class: ui.value.base({ class: [vueExports.unref(uiProp)?.base, props.class] })
              }, { ..._ctx.$attrs, ...vueExports.unref(ariaAttrs) }), {
                default: vueExports.withCtx(() => [
                  vueExports.unref(isLeading) || !!__props.avatar || !!slots.leading ? (vueExports.openBlock(), vueExports.createBlock("span", {
                    key: 0,
                    "data-slot": "leading",
                    class: ui.value.leading({ class: vueExports.unref(uiProp)?.leading })
                  }, [
                    vueExports.renderSlot(_ctx.$slots, "leading", {
                      modelValue,
                      open,
                      ui: ui.value
                    }, () => [
                      vueExports.unref(isLeading) && vueExports.unref(leadingIconName) ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                        key: 0,
                        name: vueExports.unref(leadingIconName),
                        "data-slot": "leadingIcon",
                        class: ui.value.leadingIcon({ class: vueExports.unref(uiProp)?.leadingIcon })
                      }, null, 8, ["name", "class"])) : !!__props.avatar ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$b, vueExports.mergeProps({
                        key: 1,
                        size: vueExports.unref(uiProp)?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                      }, __props.avatar, {
                        "data-slot": "itemLeadingAvatar",
                        class: ui.value.itemLeadingAvatar({ class: vueExports.unref(uiProp)?.itemLeadingAvatar })
                      }), null, 16, ["size", "class"])) : vueExports.createCommentVNode("", true)
                    ])
                  ], 2)) : vueExports.createCommentVNode("", true),
                  (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList([displayValue(modelValue)], (displayedModelValue) => {
                    return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(SelectValue_default), {
                      key: displayedModelValue,
                      "data-slot": displayedModelValue != null ? "value" : "placeholder",
                      class: displayedModelValue != null ? ui.value.value({ class: vueExports.unref(uiProp)?.value }) : ui.value.placeholder({ class: vueExports.unref(uiProp)?.placeholder })
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.renderSlot(_ctx.$slots, "default", {
                          modelValue,
                          open,
                          ui: ui.value
                        }, () => [
                          vueExports.createTextVNode(vueExports.toDisplayString(displayedModelValue ?? (__props.placeholder ?? " ")), 1)
                        ])
                      ]),
                      _: 2
                    }, 1032, ["data-slot", "class"]);
                  }), 128)),
                  vueExports.unref(isTrailing) || !!slots.trailing ? (vueExports.openBlock(), vueExports.createBlock("span", {
                    key: 1,
                    "data-slot": "trailing",
                    class: ui.value.trailing({ class: vueExports.unref(uiProp)?.trailing })
                  }, [
                    vueExports.renderSlot(_ctx.$slots, "trailing", {
                      modelValue,
                      open,
                      ui: ui.value
                    }, () => [
                      vueExports.unref(trailingIconName) ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                        key: 0,
                        name: vueExports.unref(trailingIconName),
                        "data-slot": "trailingIcon",
                        class: ui.value.trailingIcon({ class: vueExports.unref(uiProp)?.trailingIcon })
                      }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                    ])
                  ], 2)) : vueExports.createCommentVNode("", true)
                ]),
                _: 2
              }, 1040, ["id", "class"]),
              vueExports.createVNode(vueExports.unref(SelectPortal_default), vueExports.unref(portalProps), {
                default: vueExports.withCtx(() => [
                  vueExports.createVNode(vueExports.unref(FieldGroupReset), null, {
                    default: vueExports.withCtx(() => [
                      vueExports.createVNode(vueExports.unref(SelectContent_default), vueExports.mergeProps({
                        "data-slot": "content",
                        class: ui.value.content({ class: vueExports.unref(uiProp)?.content })
                      }, contentProps.value), {
                        default: vueExports.withCtx(() => [
                          vueExports.renderSlot(_ctx.$slots, "content-top"),
                          (vueExports.openBlock(), vueExports.createBlock(vueExports.resolveDynamicComponent(isItemAligned.value ? vueExports.unref(SelectViewport_default) : "div"), {
                            ref_key: "viewportRef",
                            ref: viewportRef,
                            role: "presentation",
                            "data-slot": "viewport",
                            class: ui.value.viewport({ class: vueExports.unref(uiProp)?.viewport })
                          }, {
                            default: vueExports.withCtx(() => [
                              (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(groups.value, (group, groupIndex) => {
                                return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(SelectGroup_default), {
                                  key: `group-${groupIndex}`,
                                  "data-slot": "group",
                                  class: ui.value.group({ class: vueExports.unref(uiProp)?.group })
                                }, {
                                  default: vueExports.withCtx(() => [
                                    (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(group, (item, index) => {
                                      return vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, {
                                        key: `group-${groupIndex}-${index}`
                                      }, [
                                        isSelectItem(item) && item.type === "label" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(SelectLabel_default), {
                                          key: 0,
                                          "data-slot": "label",
                                          class: ui.value.label({ class: [vueExports.unref(uiProp)?.label, item.ui?.label, item.class] })
                                        }, {
                                          default: vueExports.withCtx(() => [
                                            vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get)(item, props.labelKey)), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["class"])) : isSelectItem(item) && item.type === "separator" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(SelectSeparator_default), {
                                          key: 1,
                                          "data-slot": "separator",
                                          class: ui.value.separator({ class: [vueExports.unref(uiProp)?.separator, item.ui?.separator, item.class] })
                                        }, null, 8, ["class"])) : (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(SelectItem_default), {
                                          key: 2,
                                          "data-slot": "item",
                                          class: ui.value.item({ class: [vueExports.unref(uiProp)?.item, isSelectItem(item) && item.ui?.item, isSelectItem(item) && item.class] }),
                                          disabled: isSelectItem(item) && item.disabled,
                                          value: isSelectItem(item) ? vueExports.unref(get)(item, props.valueKey) : item,
                                          onSelect: ($event) => isSelectItem(item) && item.onSelect?.($event)
                                        }, {
                                          default: vueExports.withCtx(() => [
                                            vueExports.renderSlot(_ctx.$slots, "item", {
                                              item,
                                              index,
                                              ui: ui.value
                                            }, () => [
                                              vueExports.renderSlot(_ctx.$slots, "item-leading", {
                                                item,
                                                index,
                                                ui: ui.value
                                              }, () => [
                                                isSelectItem(item) && item.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, {
                                                  key: 0,
                                                  name: item.icon,
                                                  "data-slot": "itemLeadingIcon",
                                                  class: ui.value.itemLeadingIcon({ class: [vueExports.unref(uiProp)?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
                                                }, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$b, vueExports.mergeProps({
                                                  key: 1,
                                                  size: item.ui?.itemLeadingAvatarSize || vueExports.unref(uiProp)?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                                                }, { ref_for: true }, item.avatar, {
                                                  "data-slot": "itemLeadingAvatar",
                                                  class: ui.value.itemLeadingAvatar({ class: [vueExports.unref(uiProp)?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
                                                }), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$c, vueExports.mergeProps({
                                                  key: 2,
                                                  size: item.ui?.itemLeadingChipSize || vueExports.unref(uiProp)?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
                                                  inset: "",
                                                  standalone: ""
                                                }, { ref_for: true }, item.chip, {
                                                  "data-slot": "itemLeadingChip",
                                                  class: ui.value.itemLeadingChip({ class: [vueExports.unref(uiProp)?.itemLeadingChip, item.ui?.itemLeadingChip] })
                                                }), null, 16, ["size", "class"])) : vueExports.createCommentVNode("", true)
                                              ]),
                                              vueExports.createVNode("span", {
                                                "data-slot": "itemWrapper",
                                                class: ui.value.itemWrapper({ class: [vueExports.unref(uiProp)?.itemWrapper, isSelectItem(item) && item.ui?.itemWrapper] })
                                              }, [
                                                vueExports.createVNode(vueExports.unref(SelectItemText_default), {
                                                  "data-slot": "itemLabel",
                                                  class: ui.value.itemLabel({ class: [vueExports.unref(uiProp)?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
                                                }, {
                                                  default: vueExports.withCtx(() => [
                                                    vueExports.renderSlot(_ctx.$slots, "item-label", {
                                                      item,
                                                      index
                                                    }, () => [
                                                      vueExports.createTextVNode(vueExports.toDisplayString(isSelectItem(item) ? vueExports.unref(get)(item, props.labelKey) : item), 1)
                                                    ])
                                                  ]),
                                                  _: 2
                                                }, 1032, ["class"]),
                                                isSelectItem(item) && (vueExports.unref(get)(item, props.descriptionKey) || !!slots["item-description"]) ? (vueExports.openBlock(), vueExports.createBlock("span", {
                                                  key: 0,
                                                  "data-slot": "itemDescription",
                                                  class: ui.value.itemDescription({ class: [vueExports.unref(uiProp)?.itemDescription, isSelectItem(item) && item.ui?.itemDescription] })
                                                }, [
                                                  vueExports.renderSlot(_ctx.$slots, "item-description", {
                                                    item,
                                                    index
                                                  }, () => [
                                                    vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get)(item, props.descriptionKey)), 1)
                                                  ])
                                                ], 2)) : vueExports.createCommentVNode("", true)
                                              ], 2),
                                              vueExports.createVNode("span", {
                                                "data-slot": "itemTrailing",
                                                class: ui.value.itemTrailing({ class: [vueExports.unref(uiProp)?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] })
                                              }, [
                                                vueExports.renderSlot(_ctx.$slots, "item-trailing", {
                                                  item,
                                                  index,
                                                  ui: ui.value
                                                }),
                                                vueExports.createVNode(vueExports.unref(SelectItemIndicator_default), { "as-child": "" }, {
                                                  default: vueExports.withCtx(() => [
                                                    vueExports.createVNode(_sfc_main$d, {
                                                      name: __props.selectedIcon || vueExports.unref(appConfig).ui.icons.check,
                                                      "data-slot": "itemTrailingIcon",
                                                      class: ui.value.itemTrailingIcon({ class: [vueExports.unref(uiProp)?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
                                                    }, null, 8, ["name", "class"])
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ], 2)
                                            ])
                                          ]),
                                          _: 2
                                        }, 1032, ["class", "disabled", "value", "onSelect"]))
                                      ], 64);
                                    }), 128))
                                  ]),
                                  _: 2
                                }, 1032, ["class"]);
                              }), 128))
                            ]),
                            _: 3
                          }, 8, ["class"])),
                          vueExports.renderSlot(_ctx.$slots, "content-bottom"),
                          !!__props.arrow ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(SelectArrow_default), vueExports.mergeProps({ key: 0 }, arrowProps.value, {
                            "data-slot": "arrow",
                            class: ui.value.arrow({ class: vueExports.unref(uiProp)?.arrow })
                          }), null, 16, ["class"])) : vueExports.createCommentVNode("", true)
                        ]),
                        _: 3
                      }, 16, ["class"])
                    ]),
                    _: 3
                  })
                ]),
                _: 3
              }, 16)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.7.1_@internationalized+date@3.12.1_@internationalized+number@3.6.6_@netlify+_973710bc93b7c9087ede7bb193bd0af6/node_modules/@nuxt/ui/dist/runtime/components/Select.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _, useFormControl as u };
//# sourceMappingURL=Select-5iHH8d-R.mjs.map
