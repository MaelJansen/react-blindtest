import React from "react";
import { Grid, Image } from "semantic-ui-react";

export default function () {
    const sizes = ["big", "huge", "massive"]

    return (
        <Grid textAlign="center" style={{ height: "90vh" }} verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 450 }}>
                <Image src="/images/trophy.png"/>
            </Grid.Column>
        </Grid>
        )
    }