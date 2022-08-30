import { ButtonGroup, Button } from "@material-ui/core";

export function SwtichButton(props: any) {
    const { setAddState } = props;
    return (
        <div>
            <ButtonGroup >
                <Button
                    onClick={() => {
                        setAddState(true);
                    }}>
                    Add Liuqidity
                </Button>
                <Button
                    onClick={() => {
                        setAddState(false);
                    }}>
                    Remove Liuqidity
                </Button>
            </ButtonGroup>

        </div>
    )
}