import * as React from 'react';
import { FaHome } from 'react-icons/fa';
import { BsFillStarFill } from "react-icons/bs"
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

function SearchRuta() {
    return (
        <>
            <div className="cardCronogramaInfo">

                <Paper
                    component="form"
                    sx={{ p: '1px 4px', display: 'flex', alignItems: 'center', width: 400, margin:1.5 }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Buscar"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>


                <div className='items-rutas'>
                    <FaHome className='home-icon'></FaHome>
                    <a href='#' className='items-font'>Inicio</a>
                </div>

                <div className='items-rutas'>
                    <BsFillStarFill className='star-icon'></BsFillStarFill>
                    <a href='#' className='items-font'>Favoritos</a>
                </div>

            </div>
        </>

    );
}

export default SearchRuta;