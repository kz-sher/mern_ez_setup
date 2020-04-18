import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button, Header, Message, Segment } from 'semantic-ui-react';

const styles = {
    root: {
        padding: '1em 0em',
    }
}

const NotFoundPage = () => {
    return (
        <Segment style={styles.root} vertical>
            <Grid container>
                <Grid.Row>
                    <Grid.Column>
                        <Message>
                            <Header as='h1'>Page Not Found</Header>
                            <p>
                                Sorry, this content isn't available right now.
                            </p>
                            <Button color='blue' as={Link} to='/'>Back</Button>
                        </Message>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    )
}

export default NotFoundPage;
