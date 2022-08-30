import React, { ChangeEvent, useEffect } from "react";

import { Button, TextField, InputAdornment } from "@material-ui/core";
import SwapVerticalCircleIcon from "@material-ui/icons/SwapVerticalCircle";

import { getEthToTokenOutputAmount, calculateSlippage } from '../../functions/swap';
import { GRAY_ADDRESS } from "../../constants/address";
import { toWei, fromWei, onEthToTokenSwap } from "../../utils/ether";

export function Swap(props: any) {
    const [inputValue, setInputValue] = React.useState('');
    const [outputValue, setOutputValue] = React.useState('');
    const slippage = 200;
    const account = props.account;
    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setInputValue(event.target.value);
    }

    async function getOutputAmount() {
        const output = await getEthToTokenOutputAmount(inputValue, GRAY_ADDRESS, props.network);
        const outputWithSlippage = calculateSlippage(slippage, output).minimum;
        setOutputValue(fromWei(outputWithSlippage));
    }

    async function onSwap() {
        onEthToTokenSwap(toWei(inputValue), toWei(outputValue), GRAY_ADDRESS, props.network);    
    }

    useEffect( () => {
        getOutputAmount();
    }, [inputValue]);
    
    return (
        <div>
            <div>
                <TextField
                    value={inputValue}
                    onChange={handleInput}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">ETH</InputAdornment>,
                    }}
                    variant="standard"
                />
            </div>

            <SwapVerticalCircleIcon />
            <div>
                <TextField
                    value={outputValue}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">GRAY</InputAdornment>,
                    }}
                    variant="standard"
                />
            </div>
            
            <Button color="primary" variant="contained" onClick={onSwap}>Swap</Button>
        </div>
    )
}