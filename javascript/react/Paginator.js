import React, { useReducer, useEffect } from "react";

export const usePagination = ({ pageLength, itemCount }) => {
  const makeDefaultState = () => ({
    page: 1,
    pageCount: Math.ceil(itemCount / pageLength),
    first: 0,
    last: pageLength
  });
  const reducer = (prevState, action) => {
    const pageCount = Math.ceil(itemCount / pageLength);
    let newPage;

    switch (action.type) {
      case "reset":
        return makeDefaultState();
      case "setPage":
        newPage = Math.min(pageCount, Math.max(1, action.payload));
        break;
      case "pageUp":
        newPage = Math.min(pageCount, prevState.page + 1);
        break;
      case "pageDown":
        newPage = Math.max(1, prevState.page - 1);
        break;
      default:
        return prevState;
    }

    return {
      ...prevState,
      page: newPage,
      first: (newPage - 1) * pageLength,
      last: newPage * pageLength
    };
  };

  const [state, dispatch] = useReducer(reducer, makeDefaultState());

  useEffect(() => {
    dispatch({ type: "reset" });
  }, [itemCount, pageLength]);

  return [state, dispatch];
};

export const Paginator = ({ pagination, dispatch }) => {
  const { pageCount, page } = pagination;

  return (
    <div>
      {page === 1 ? (
        <button disabled>{"<"}</button>
      ) : (
        <button onClick={() => dispatch({ type: "pageDown" })}>{"<"}</button>
      )}
      {Array(pageCount)
        .fill()
        .map((_, index) => {
          return (
            <button
              key={`page-${index + 1}`}
              onClick={() =>
                dispatch({
                  type: "setPage",
                  payload: index + 1
                })
              }
              className={index + 1 === page ? "current-page" : ""}>
              {index + 1}
            </button>
          );
        })}
      {page === pageCount ? (
        <button disabled>{">"}</button>
      ) : (
        <button onClick={() => dispatch({ type: "pageUp" })}>{">"}</button>
      )}
    </div>
  );
};
