import React,{useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import {lighten, makeStyles, withStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { MainUrl } from '../FetchServices'
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import Dialog from '@material-ui/core/Dialog';
import MenuItem from '@material-ui/core/MenuItem';
import Table from '@material-ui/core/Table';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {postData} from '../FetchServicesAdmin'
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import Chip from '@material-ui/core/Chip';
import LockIcon from '@material-ui/icons/Lock';
import Badge from '@material-ui/core/Badge';
import $ from 'jquery';
import {Redirect} from 'react-router-dom';



const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
 
  { id: 'username', numeric: false, disablePadding: true, label: 'UserName' },
  { id: 'email', numeric: false, disablePadding: false, label: 'email' },
  
  { id: 'favourites', numeric: false, disablePadding: false, label: 'favourites ' },
{ id: 'Action', numeric: false, disablePadding: false, label: 'Action ' },
];

  const searchfun = () =>{
      let filter = document.getElementById('myInput').value.toUpperCase();
      let myTable = document.getElementById('myTable');
      let tr = myTable.getElementsByTagName('TableRow');
      for(var i=0; i<tr.length; i++)
      {
          let td = tr[i].getElementsByTagName('TableCell')[1];
          if(td)
          {
              let textvalue = td.textContent || td.innerHTML;
              if(textvalue.toUpperCase().indexOf(filter)>-1)
              {
                  tr[i].style.display="";
              }
              else
              {
                  tr[i].style.display="none";
              }
          }
      }
      
  }

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead style={{paddingLeft:"40px"}}>
      <TableRow >
        <TableCell>
</TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'center'}
            padding={headCell.disablePadding ? 'none' : 'default'}
style={{fontSize:"20px",fontWeight:"bold"}}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: "#293659",
          backgroundColor: "#FBB615",
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

var selectedDelVal =[]

  
const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

const updateStatus = async ()=>{
console.log('update status');
console.log('active banner',props.activeBanner)
if(selectedDelVal.length=='1' &&  selectedDelVal[0]!=props.activeBanner){

console.log('activate');

let body ={"api_key": "23ertfghoiuhvnbhgfd","activeBanner": selectedDelVal[0]} 
console.log('body',body);
    const result = await postData('bannerActiveUpdate',body)
if(result){
console.log(result);
let afterupdate ={ 'api_key':'tsegfuewhvuynhriuv'}
    var resultafterupdate = await postData('banner',afterupdate)
   
    var local = props.fillchecked
    for (var i=0; i < local.length; i++)
    {
      local[i] = false
    }
    props.setfillchecked(local)
props.setstoreKeys(Object.keys(resultafterupdate.data.BannerData))
    props.setstoreValues(Object.values(resultafterupdate.data.BannerData))
props.setActiveBanner(resultafterupdate.data.activeBanner)
 props.setSelected([])


}
}
if(selectedDelVal.length!='1')
{
console.log('You can not Active more then one Banner');
}
else 
{
console.log(' this Banner is already activated')
}
}

const delValues = async()=>{

if(selectedDelVal && selectedDelVal[0]!=props.activeBanner){
let body ={"api_key": "wi6ftgwpokpohazq","bannerDeleteData": selectedDelVal} 
    const result = await postData('bannerDelete',body)
 if(result){
console.log(result);
 let afterDel ={ 'api_key':'tsegfuewhvuynhriuv'}
    var resultafterDel = await postData('banner',afterDel)
   
    var local = props.fillchecked
    for (var i=0; i < local.length; i++)
    {
      local[i] = false
    }
    props.setfillchecked(local)
props.setstoreKeys(Object.keys(resultafterDel.data.BannerData))
    props.setstoreValues(Object.values(resultafterDel.data.BannerData))

 props.setSelected([])
}
}
else 
{
alert('false del')
console.log('you can not delete active banner');
}


}

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h5" id="tableTitle" component="div">
          Banner List
{/*<input style={{marginLeft:"20px"}} type="text" name="" id="myInput" onkeyup={() => searchfun()}/>*/}
        </Typography>


      )}

      {numSelected > 0 ? (

        <Tooltip title="Delete" style={{width:"300px"}}>
<div>
<span>
 <Button
                  variant="contained"

style={{                  color:"#FFFFFF"
,backgroundColor:"#293659"}}
                  className={classes.button}

onClick={updateStatus}
                  startIcon={<EditIcon />}
                >
                  {" "}
                  Active{" "}
                </Button>
</span>
<span>
         <Button
                  variant="contained"
style={{
                  color:"#FFFFFF",
backgroundColor:"red"

}}        
          className={classes.button}

onClick={delValues}
                  startIcon={<DeleteIcon />}
                >
                  {" "}
                  Delete{" "}
                </Button>
</span>
</div>
      {          
 /*         <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
*/}
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};


const useStyles = makeStyles((theme)=>({
root: {
    width: '100%',
  },
  paper: {
    width: '90%',
    marginBottom: theme.spacing(2),
marginLeft:"5%",
marginTop:"7%",
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  progressCss:{
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },    
grow: {
        flexGrow: 1,
        
      },


    appbar:{
            backgroundColor: "#293659",
            position: "fixed",
            top:0,
            zIndex: 1,
            display : 'flex',
          },

    title: {
            display: 'block',
            marginLeft:'-30px',
            [theme.breakpoints.down('sm')]: {
              display: 'block',
              marginLeft:'-30px'
            },
          },

    sectionDesktop: {
            display: 'none',
            [theme.breakpoints.up('md')]: {
              display: 'flex',
            },
          },
    sectionMobile: {
            display: 'flex',
            [theme.breakpoints.up('md')]: {
              display: 'none',
            },
          },
    exzoneHeading :{
          margin:'auto',
          fontWeight:'bold',
          fontSize:'30px',
          [theme.breakpoints.down('sm')]: {
            fontSize:'15px',
          },
    }
}))


export default function UserData(props){

    const classes = useStyles();
  
   
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [openSignIn, setOpenSignIn] = React.useState(false);
    const [openSignUp, setOpenSignUp] = React.useState(false);
    const mobileMenuId = 'primary-search-account-menu-mobile'
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
const [storeKeys,setstoreKeys]= React.useState([])
const [storeValues,setstoreValues] = React.useState([])
const [activeBanner,setActiveBanner]=React.useState('')
const [fillchecked,setfillchecked] = React.useState([])


   
const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = storeValues.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

function EditBannerPageFun (id){
let body ={
    'id':id,

 
}
 console.log(body)
console.log(props);
 props.setViews('EditBannerPage',body);
}


  useEffect(()=>{

   console.log('bannerMain',props);
    readDataFromServer(props.id)

checkActive();
  },[])
const token = localStorage.getItem("token");
if(token == null){
return(<Redirect to='/'/>)
}


  const readDataFromServer = async(id)=>{

    let body={
           
              'api_key':'tsegfuewhvuynhriuv'
            
            }

let result=await postData('banner',body)
console.log('hi',result);
if (result.result)    
    {
    delete result.result
 
    setstoreKeys(Object.keys(result.data.BannerData))
    setstoreValues(Object.values(result.data.BannerData))
console.log(result.data.activeBanner)
setActiveBanner(result.data.activeBanner)

console.log(result.data.activeBanner)

 var local =[]
  for( var i =0; i< Object.keys(result.data).length; i++)
{
 local[i]= false
}
    setfillchecked(local)
    console.log(local)
    

$(document).ready(function check() {


console.log('calling function');

});

   }
    else
    {
      alert("Network Issue .Please Reload Page!")
    }
  }

const checkActive = async()=>{
console.log('hi');
}

  const handleClick = (event, id,index) => {console.log(fillchecked)
    if(!fillchecked[index]){
   var local =[...fillchecked]
   console.log(local);
   local[index]= true
  setfillchecked(local)
    }
    else if(fillchecked[index]){
      var local =[...fillchecked]
      local[index]= false
     setfillchecked(local)

    }

    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
selectedDelVal=newSelected;
console.log(selectedDelVal);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

 

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, storeValues.length - page * rowsPerPage);




 

    function renderMobileMenuBeforeLogin(){
      return(
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
        
      >
        <MenuItem style={{background:"#293659"}}>  
     
        <Typography type="Button" style={{color:"white"}}  onClick={()=>handleClickOpenHomePage()}>HomePage</Typography>
        </MenuItem>
        <MenuItem style={{background:"#293659"}}>
      
       <Typography type="Button" style={{color:"white"}} onClick={()=>handleClickOpenLogout()}>Logout</Typography>
        </MenuItem>
      </Menu>
    )}

     

      function desktopBeforeLogin(){
        return(
         <div style={{ display: "flex", paddingRight:"20px"}}>
      
        <Typography type="Button" style={{}} onClick={()=>handleClickOpenHomePage()}>HomePage</Typography>
              &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
              <Typography type="Button" style={{}} onClick={()=>handleClickOpenLogout()}>Logout</Typography>
       
         </div>
       
        )
       }


       const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
      };
     
     

      const handleClickOpenHomePage = () => {
     
 window.location = '/HomePage';
      };

      const handleClickOpenLogout = () => {
        localStorage.removeItem("token");
 window.location = '/';
      };

      const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
      };

      const handleClose = () => {
        setOpenSignIn(false);
        setOpenSignUp(false);
        
      };



    return(
        <div>
       
     <div className={classes.grow}>

       <AppBar position="static" className={classes.appbar}>
         <Toolbar>
         
          <div  className={classes.exzoneHeading}>U<font style={{color:'#fbb615'}}>SE</font>R D<font style={{color:'#fbb615'}}>AT</font>A</div>

             
           <div className={classes.sectionDesktop}>
           {desktopBeforeLogin()}
            
           </div>
           <div className={classes.sectionMobile}>
             <IconButton
               aria-label="show more"
               aria-controls={mobileMenuId}
               aria-haspopup="true"
               onClick={handleMobileMenuOpen}
               color="inherit"
             >
               <MoreIcon />
             </IconButton>
           </div>
           {renderMobileMenuBeforeLogin()}
         </Toolbar>
       </AppBar>
       </div>

<div className={classes.root}>






      <Paper className={classes.paper}>
       <EnhancedTableToolbar numSelected={selected.length} setActiveBanner={setActiveBanner} fillchecked={fillchecked} activeBanner={activeBanner} setfillchecked={setfillchecked} setSelected ={setSelected}  setstoreKeys={setstoreKeys} setstoreValues={setstoreValues}/>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={storeValues.length}
            />
            <TableBody id="myTable">
              {stableSort(storeValues, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row);
                  const labelId = `enhanced-table-checkbox-${index}`;
 console.log(fillchecked[index])
                  return (
                    <TableRow
                    hover
                      
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox"  onClick={(event) => handleClick(event, storeKeys[index], index)}>
                        <Checkbox
                         checked={fillchecked[index]?fillchecked[index]=true :fillchecked[index]=false }
style={{color:"#293659"}}                          
inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell align="center" component="th" id={labelId} scope="row" padding="none">
<Typography variant="" component=""  >                        
{row.title}</Typography>
                      </TableCell>

 {activeBanner === storeKeys[index] ? 

                      <TableCell align="center"  >
<StyledBadge
        overlap="circle"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        variant="dot"
      >
<Chip
    size="small"

 
    label="Active"
    style={{backgroundColor:"#293659",color:"white"}}
   />
   </StyledBadge>
    
</TableCell>
 : 
<TableCell align="center" >
    <Chip
        size="small"
        icon={<LockIcon style={{color:"white"}} />}
        label="UnActive"
        color="default"
       />
    </TableCell>

}
<TableCell align="center" >
    <Chip
        size="small"
        icon={<LockIcon style={{color:"white"}} />}
        label="UnActive"
        color="default"
       />
    </TableCell>

                      <TableCell align="center">
                      <Button
                  variant="contained"
onClick={()=>EditBannerPageFun(storeKeys[index])}
                  style={{ backgroundColor: "#293659" , color:"#FFFFFF"}}
                  startIcon={<AddIcon/>}
                >
                  {" "}
                  Add Favourites{" "}
                </Button>
                        </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10,15,20, 25,40,50,100]}
          component="div"
          count={storeValues.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    
    </div>
      
       </div>
    )
}