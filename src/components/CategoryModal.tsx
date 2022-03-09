import React, { useEffect } from "react";
import { Category, Modal as ModalModel } from "../models/App";
import { BASE_URL } from "../utils/service";
import "./modal.scss";

const CategoryModal: React.FC<ModalModel> = ({ open, onSubmit }) => {

    const [categoryName, setCategoryName] = React.useState<string>("");
    const [categoryUrl, setCategoryUrl] = React.useState<string>(BASE_URL);
    const [errors, setErrors] = React.useState<any>({
        categoryName: "",
        categoryUrl: ""
    });

    useEffect(() => {
        setCategoryName("");
        setCategoryUrl(BASE_URL);
        setErrors({
            categoryName: "",
            categoryUrl: ""
        });
    }, [open])

    const isValid = () => {
        let errors: any = {};
        if (!categoryName) {
            errors.categoryName = "Category name is required";
        }
        if (!categoryUrl) {
            errors.categoryUrl = "Category url is required";
        } else if (!categoryUrl.startsWith(BASE_URL)) {
            errors.categoryUrl = `Category url must start with "${BASE_URL}"`;
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const submit = (event: React.BaseSyntheticEvent) => {
        event.preventDefault();
        if (isValid()) {
            let category: Category = {
                categoryName: categoryName,
                categoryUrl: categoryUrl
            }
            onSubmit(true, category);
        }
    };

    return open ? (
        <div className="main-modal-div">
            <div className="backdrop" onClick={() => onSubmit(false)}></div>
            <div className="modal">
                <div className="modal__content">
                    <form onSubmit={submit}>
                        <div className="modal__content__header">
                            <h2 className="modal__content__header__title">
                                Add Category
                            </h2>
                        </div>
                        <div className="modal__content__body">
                            <div className="modal__content__body__input">
                                <input
                                    name="categoryName"
                                    placeholder="Category Name"
                                    value={categoryName}
                                    onChange={(event) => {
                                        setCategoryName(event.target.value);
                                    }}
                                />
                                {errors.categoryName && <div className="modal__content__body__input__error">
                                    {errors.categoryName}
                                </div>}
                            </div>
                            <div className="modal__content__body__input">
                                <input
                                    name="categoryUrl"
                                    placeholder="API URL"
                                    defaultValue={categoryUrl}
                                    value={categoryUrl+categoryName}
                                    disabled={!!categoryUrl}
                                    onChange={(event) => setCategoryUrl(event.target.value)}
                                />
                                {errors.categoryUrl && <div className="modal__content__body__input__error">
                                    {errors.categoryUrl}
                                </div>}
                            </div>
                        </div>
                        <div className="modal__content__footer">
                            <button
                                type="submit"
                                className="modal__content__footer__button"
                            >
                                + Add
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    ) : null
}

export default CategoryModal;