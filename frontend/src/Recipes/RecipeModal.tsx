import { Dispatch, SetStateAction } from "react";
import Modal from "react-bootstrap/Modal";
import { Recipe } from "./Recipe";

export interface RecipeListProps {
  modalShow: boolean;
  setModalShow: Dispatch<SetStateAction<boolean>>;
  recipe: Recipe;
}

export default function RecipeModal({
  modalShow,
  setModalShow,
  recipe,
}: RecipeListProps) {
  const handleModalClose = () => {
    setModalShow(false);
  };
  return (
    <Modal show={modalShow} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Recipe for {recipe.recipe_name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul>
          {recipe.items.map((item, index) => (
            <li key={index}>
              {item.formItemName} - {item.formItemQty} {item.formUnit}
            </li>
          ))}
        </ul>
      </Modal.Body>
    </Modal>
  );
}
