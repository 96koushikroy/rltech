import React, { Dispatch, SetStateAction, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Recipe, Item } from "./Recipe";
import { toast, ToastContainer } from "react-toastify";

export interface AddRecipeProps {
  addRecipeList: Dispatch<SetStateAction<Recipe[]>>;
}

export default function RecipesPage({ addRecipeList }: AddRecipeProps) {
  const [recipeName, setRecipeName] = useState<string>("");
  const [fields, setFields] = useState<Item[]>([]);

  const handleAddField = () => {
    setFields([...fields, { formItemName: "", formItemQty: 0, formUnit: "" }]);
  };
  const handleRemoveField = () => {
    if (fields.length === 0) {
      return;
    }
    const copyFields = [...fields];
    copyFields.pop();
    setFields(copyFields);
  };

  const handleChangeRecipeName = (event: any) => {
    setRecipeName(event.target.value);
  };

  const handleItemChange = (index: number, event: any) => {
    const { id, value } = event.target;
    const change = {
      [id]: value,
    };
    setFields((fields) => {
      const field = { ...fields[index], ...change };
      fields[index] = field;
      return fields;
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (recipeName == "") {
      toast.error("Recipe name cannot be empty");
      return;
    }

    if (fields.length == 0) {
      toast.error("At least add one item");
      return;
    }

    if (
      fields.some((e) => e.formItemName === "") ||
      fields.some((e) => e.formUnit === "")
    ) {
      toast.error("Item fields cannot be empty");
      return;
    }

    const payload: Recipe = {
      recipe_name: recipeName,
      items: fields,
    };
    addRecipeList((recipes) => {
      recipes = [...recipes, payload];
      return recipes;
    });
    setFields([]);
    setRecipeName("");
    toast.success("Recipe added successfully!");
  };

  return (
    <>
      <Container>
        <Row>
          <Col md={3}></Col>
          <Col md={6}>
            <Card bg="light" key="Light" text="dark" className="mb-2">
              <Card.Header>Recipe</Card.Header>
              <Card.Body>
                <Card.Title>Add a Recipe</Card.Title>
                <Card.Text>
                  <Form>
                    <Form.Group className="mb-3" controlId="formRecipeName">
                      <Form.Label>Recipe Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter the recipe name"
                        value={recipeName}
                        onChange={handleChangeRecipeName}
                      />
                    </Form.Group>
                    {fields.map((field, index) => (
                      <Row key={index}>
                        <Col md={6}>
                          <Form.Group className="mb-3" controlId="formItemName">
                            <Form.Label>Item {index + 1}</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Item Name"
                              onChange={(event) =>
                                handleItemChange(index, event)
                              }
                            />
                          </Form.Group>
                        </Col>
                        <Col md={3}>
                          <Form.Group className="mb-3" controlId="formItemQty">
                            <Form.Label>Qty</Form.Label>
                            <Form.Control
                              type="number"
                              placeholder="Qty"
                              onChange={(event) =>
                                handleItemChange(index, event)
                              }
                            />
                          </Form.Group>
                        </Col>
                        <Col md={3}>
                          <Form.Group className="mb-3" controlId="formUnit">
                            <Form.Label>Units</Form.Label>
                            <Form.Select
                              aria-label="Default select example"
                              onChange={(event) =>
                                handleItemChange(index, event)
                              }
                            >
                              <option value="-">Select</option>
                              <option value="Tbsp">Tbsp</option>
                              <option value="Cups">Cups</option>
                              <option value="Lbs">Lbs</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>
                    ))}

                    <Row className="pull-right">
                      <Col md={12}>
                        <Button
                          variant="primary"
                          size="sm"
                          className="center-block"
                          onClick={handleAddField}
                        >
                          + Add Item
                        </Button>
                        &nbsp;
                        <Button
                          variant="primary"
                          size="sm"
                          className="center-block"
                          onClick={handleRemoveField}
                        >
                          - Remove Item
                        </Button>
                      </Col>
                    </Row>
                    <br />
                    <div className="text-center">
                      <Button
                        variant="primary"
                        type="submit"
                        onClick={handleSubmit}
                      >
                        Add Recipe
                      </Button>
                    </div>
                  </Form>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}></Col>
        </Row>
        <ToastContainer />
      </Container>
    </>
  );
}
