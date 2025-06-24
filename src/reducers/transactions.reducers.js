const actions = {
  fetchTransactions: "fetchTransactions",
  loadTransactions: "loadTransactions",
  setLoadError: "setLoadError",
  startRequest: "startRequest",
  addTransaction: "addTransaction",
  endRequest: "endRequest",
  updateTransaction: "updateTransaction",
  deleteTransaction: "deleteTransaction",
  revertTransaction: "revertTransaction",
  clearError: "clearError",
};

const initialState = {
  transactions: [],
  isLoading: false,
  isSaving: false,
  errorMessage: "",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.fetchTransactions:
      return {
        ...state,
        isLoading: true,
      };

    case actions.loadTransactions: {
      const fetchedTransactions = action.records.map((record) => {
        return {
          id: record.id,
          ...record.fields,
        };
      });
      return {
        ...state,
        transactions: [...fetchedTransactions],
        isLoading: false,
      };
    }

    case actions.setLoadError:
      return {
        ...state,
        errorMessage: action.error.message,
        isLoading: false,
        isSaving: false,
      };

    case actions.startRequest:
      return {
        ...state,
        isSaving: true,
      };

    case actions.addTransaction: {
      const savedTransaction = {
        id: action.records[0].id,
        ...action.records[0].fields,
      };
      return {
        ...state,
        transactions: [savedTransaction, ...state.transactions],
      };
    }

    case actions.endRequest:
      return {
        ...state,
        isLoading: false,
        isSaving: false,
      };

    case actions.updateTransaction: {
      const updatedTransactions = state.transactions.map((transaction) => {
        if (transaction.id === action.updatedTransaction.id) {
          return { ...action.updatedTransaction };
        }
        return transaction;
      });
      return {
        ...state,
        transactions: [...updatedTransactions],
      };
    }

    case actions.deleteTransaction: {
      const filteredTransactions = state.transactions.filter(
        (transaction) => transaction.id !== action.id
      );
      return {
        ...state,
        transactions: [...filteredTransactions],
      };
    }

    case actions.revertTransaction: {
      const revertedTransactions = state.transactions.map((transaction) => {
        if (transaction.id === action.originalTransaction.id) {
          return { ...action.originalTransaction };
        }
        return transaction;
      });
      return {
        ...state,
        transactions: [...revertedTransactions],
      };
    }

    case actions.clearError:
      return {
        ...state,
        errorMessage: "",
      };

    default:
      return state;
  }
}

export { initialState, actions, reducer };
