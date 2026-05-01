export type MODELS = 'gpt-4o-mini' | 'gpt-5-mini';
let MODEL : MODELS = "gpt-4o-mini";

const getModel = () => {
    return MODEL;
};

const updateModel = async (model: MODELS) => {
    MODEL = model;
};

export { getModel, updateModel };