import React, { useState } from 'react';
import { Button, Card,Row,Col } from "react-bootstrap";
import drinks from "../data/coffeeTypes.json";
import coffeeShops from "../data/coffeeShops.json";

export default function DrinkChoice() {

    const allAttributes = [...new Set(drinks.flatMap(drink => drink.attributes))];

    const [selectedAttributes, setSelectedAttributes] = useState({});
    const [selectedDrink, setSelectedDrink] = useState(null);

    const toggleAttribute = (attr) => {
        setSelectedAttributes(prev => ({
            ...prev,
            [attr]: !prev[attr],
        }));
    };

    const decisions = Object.keys(selectedAttributes)
        .filter(attr => selectedAttributes[attr]);

    const matchingDrinks = drinks.filter(drink =>
        decisions.every(attr => drink.attributes.includes(attr))
    )

    const matchingShops = selectedDrink 
    ? coffeeShops.filter(shop => shop.drinks.includes(selectedDrink))
    : [];

    return (
        <>
        <h1>Search for a Drink!</h1>
        <p>Feeling indecisive or wanting to try something new?</p>
        <Row>
            <Col md={6}>

        <Card style={{ height: "300px", overflowY: "auto" }}>
            <p><strong>What Kind of Drink Are You Feeling?</strong></p>

            {allAttributes.map(attr => (
                <div className="form-check" key={attr}>
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id={`check-${attr}`}
                        checked={!!selectedAttributes[attr]}
                        onChange={() => toggleAttribute(attr)}
                    />
                    <label className="form-check-label" htmlFor={`check-${attr}`}>
                        {attr.charAt(0).toUpperCase() + attr.slice(1)}
                    </label>
                </div>
            ))}
            </Card>
            </Col>
            <Col md={6}>
            <Card style={{ height: "300px", overflowY: "auto" }}>
                <div>

                <p><strong>Recommended Drinks:</strong></p>

                {matchingDrinks.length === 0 ? (
                    <p>No drinks match your choices yet.</p>
                ) : (
                    matchingDrinks.map(drink => (
                        <p 
                        key={drink.drink}
                        style={{ cursor: "pointer" }}
                        onClick={() => setSelectedDrink(drink.drink)}
                        >
                        {drink.drink}
                        </p>
                    ))
                )}

                </div>



            </Card>
            </Col>
            </Row>
            <Card style={{ marginTop:"25px", height: "300px", overflowY: "auto" }}>
            {selectedDrink ? (
                    <>
                        <p><strong>Shops Serving: {selectedDrink.charAt(0).toUpperCase() + selectedDrink.slice(1)}</strong></p>

                        {matchingShops.length === 0 ? (
                            <p>No shops serve this drink.</p>
                        ) : (
                            matchingShops.map(shop => (
                                <p key={shop.name}>{shop.name}</p>
                            ))
                        )}
                    </>
                ) : (
                    <p><strong>Select a drink to see where it's available.</strong></p>
                )}



            </Card>
        </>
    );
}