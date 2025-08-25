export const initialCartState = {
  items: [],
};

export function normalizeId(v) {
  return String(v);
}

export function cartReducer(state, action) {
  switch (action.type) {
    case "INIT": {
      return { ...state, items: action.payload };
    }
    case "ADD": {
      const p = action.payload;
      const pid = normalizeId(p.id);
      const items = [...state.items];
      const idx = items.findIndex((x) => normalizeId(x.id) === pid);
      if (idx === -1) {
        items.push({
          id: p.id,
          title: p.title,
          image: p.image,
          price: p.salePrice ?? p.price ?? 0, // ưu tiên salePrice
          qty: 1,
        });
      } else {
        const it = items[idx];
        items[idx] = { ...it, qty: (it.qty || 0) + 1 };
      }
      return { ...state, items };
    }
    case "INC": {
      const pid = normalizeId(action.payload);
      const items = state.items.map((it) =>
        normalizeId(it.id) === pid ? { ...it, qty: (it.qty || 0) + 1 } : it
      );
      return { ...state, items };
    }
    case "DEC": {
      const pid = normalizeId(action.payload);
      const items = state.items
        .map((it) =>
          normalizeId(it.id) === pid
            ? { ...it, qty: Math.max((it.qty || 1) - 1, 0) }
            : it
        )
        .filter((it) => it.qty > 0);
      return { ...state, items };
    }
    case "REMOVE": {
      const pid = normalizeId(action.payload);
      const items = state.items.filter((it) => normalizeId(it.id) !== pid);
      return { ...state, items };
    }
    case "CLEAR": {
      return { ...state, items: [] };
    }
    default:
      return state;
  }
}
