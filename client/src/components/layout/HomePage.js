import React from 'react'
import { Grid, Button, Header, Message, Segment } from 'semantic-ui-react';

const styles = {
    root: {
        padding: '1em 0em',
    }
}

const HomePage = () => {
    return (
        <Segment style={styles.root} vertical>
            <Grid container>
                <Grid.Row>
                    <Grid.Column>
                        <Message>
                            <Header as='h1'>Home</Header>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </p>
                            <Button color='blue'>Learn more &raquo;</Button>
                        </Message>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    )
}

export default HomePage;
