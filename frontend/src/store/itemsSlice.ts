import { createSlice } from '@reduxjs/toolkit';
import { ResponseData } from '@/app/api/items/route';
import { call, put, takeLatest } from 'redux-saga/effects';
import { Item } from '@/types/item';
import { PayloadAction } from '@reduxjs/toolkit';

export interface ItemsState {
  items: Item[];
  isLoading: boolean;
  error: string | null;
  selectedItem: Item | null;
  drawerOpen: boolean;
}

const initialState: ItemsState = {
  items: [],
  isLoading: true,
  error: null,
  selectedItem: null,
  drawerOpen: false,
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    fetchItems(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchItemsSuccess(state, action) {
      state.items = action.payload;
      state.isLoading = false;
    },
    fetchItemsFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    addItem(state, action: PayloadAction<Omit<Item, 'id' | 'isPurchased'>>) {
      state.isLoading = true;
      state.error = null;
    },
    addItemSuccess(state, action) {
      state.items.push(action.payload);
      state.isLoading = false;
    },
    addItemFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    deleteItem(state, action: PayloadAction<number>) {
      state.isLoading = true;
      state.error = null;
    },
    deleteItemSuccess(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.isLoading = false;
    },
    deleteItemFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    selectItem(state, action: PayloadAction<Item | null>) {
      state.selectedItem = action.payload;
    },
    clearSelectedItem(state) {
      state.selectedItem = null;
    },
    openDrawer(state) {
      state.drawerOpen = true;
    },
    closeDrawer(state) {
      state.drawerOpen = false;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    editItem(state, action: PayloadAction<Item>) {
      state.isLoading = true;
      state.error = null;
    },
    editItemSuccess(state, action: PayloadAction<Item>) {
      const idx = state.items.findIndex((i) => i.id === action.payload.id);
      if (idx !== -1) state.items[idx] = action.payload;
      state.isLoading = false;
    },
    editItemFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  fetchItems,
  fetchItemsSuccess,
  fetchItemsFailure,
  addItem,
  addItemSuccess,
  addItemFailure,
  deleteItem,
  deleteItemSuccess,
  deleteItemFailure,
  selectItem,
  clearSelectedItem,
  openDrawer,
  closeDrawer,
  editItem,
  editItemSuccess,
  editItemFailure,
} = itemsSlice.actions;
export default itemsSlice.reducer;

function* fetchItemsSaga(): Generator {
  try {
    const res: Response = yield call(fetch, '/api/items');
    const data: ResponseData<Item[]> = yield call([res, 'json']);
    if (data.data) {
      yield put(fetchItemsSuccess(data.data));
    } else {
      yield put(fetchItemsFailure(data.error || 'Failed to fetch items'));
    }
  } catch (e: unknown) {
    const errorMessage =
      e instanceof Error ? e.message : 'An unknown error occurred fetching the items';
    yield put(fetchItemsFailure(errorMessage));
  }
}

function* addItemSaga(action: PayloadAction<Item>): Generator {
  try {
    const res: Response = yield call(fetch, '/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(action.payload),
    });
    const data = yield res.json();
    if (data.data) {
      yield put(addItemSuccess(data.data));
    } else {
      yield put(addItemFailure(data.error || 'Failed to add item'));
    }
  } catch (e: unknown) {
    const errorMessage =
      e instanceof Error ? e.message : 'An unknown error occurred adding an item';
    yield put(addItemFailure(errorMessage));
  }
}

function* deleteItemSaga(action: PayloadAction<number>): Generator {
  try {
    const res: Response = yield call(fetch, `/api/items?id=${action.payload}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      yield put(deleteItemSuccess(action.payload));
    } else {
      const data = yield res.json();
      yield put(deleteItemFailure(data.error || 'Failed to delete item'));
    }
  } catch (e: unknown) {
    const errorMessage =
      e instanceof Error ? e.message : 'An unknown error occurred deleting the item';
    yield put(deleteItemFailure(errorMessage));
  }
}

function* editItemSaga(action: PayloadAction<Item>): Generator {
  try {
    const res: Response = yield call(fetch, `/api/items?id=${action.payload.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(action.payload),
    });
    const data = yield res.json();
    if (data.data) {
      yield put(editItemSuccess(data.data));
    } else {
      yield put(editItemFailure(data.error || 'Failed to edit item'));
    }
  } catch (e: unknown) {
    const errorMessage =
      e instanceof Error ? e.message : 'An unknown error occurred editing the item';
    yield put(editItemFailure(errorMessage));
  }
}

export function* itemsRootSaga() {
  yield takeLatest(fetchItems.type, fetchItemsSaga);
  yield takeLatest(addItem.type, addItemSaga);
  yield takeLatest(deleteItem.type, deleteItemSaga);
  yield takeLatest(editItem.type, editItemSaga);
}
