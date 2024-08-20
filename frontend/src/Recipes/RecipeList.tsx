import { useState } from "react";
import { Recipe } from "./Recipe";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import RecipeModal from "./RecipeModal";

export interface RecipeListProps {
  recipes: Recipe[];
}
export default function RecipeList({ recipes }: RecipeListProps) {
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [modalData, setModalData] = useState<Recipe>({
    recipe_name: "",
    items: [],
  });

  const handleOpenModal = (index: number, event: any) => {
    setModalShow(true);
    setModalData(recipes[index]);
  };

  return (
    <Container>
      <Row>
        <Col md={3}></Col>
        <Col md={6} className="text-center">
          {recipes.length > 0 && <h1>List of Recipes</h1>}
          {recipes.length > 0 && (
            <Table bordered hover>
              <thead>
                <tr>
                  <th>Recipe Name</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {recipes.map((recipe, index) => (
                  <tr key={index}>
                    <td>{recipe.recipe_name}</td>
                    <td>
                      <Button
                        size="sm"
                        onClick={(event) => handleOpenModal(index, event)}
                      >
                        Open
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
        <Col md={3}></Col>
      </Row>
      <RecipeModal
        modalShow={modalShow}
        setModalShow={setModalShow}
        recipe={modalData}
      />
    </Container>
  );
}
