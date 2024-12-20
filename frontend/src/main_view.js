import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { useProductStore } from './store';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';

const NAVIGATION = [
  {
    segment: '',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'create',
    title: 'Create',
    icon: <AddBoxIcon />,
  },
  {
    segment: 'update',
    title: 'Update',
    icon: <EditIcon />,
  },
  {
    segment: 'delete',
    title: 'Delete',
    icon: <DeleteIcon />,
  },
  {
    segment: 'about-me',
    title: 'About Me',
    icon: <AccountBoxIcon />,
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function SubmitButton({ formData, setFormData, clearForm }) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(false);
  const createProduct = useProductStore(state => state.createProduct);

  async function handleClick() {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const result = await createProduct(formData);
      if (!result.success) {
        setError(result.error);
        console.error("Error:", result.error);
      } else {
        console.log("Success:", result.data);
        setSuccess(true);
        clearForm();
      }
    } catch (err) {
      setError(err.message);
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <LoadingButton
        size="large"
        onClick={handleClick}
        endIcon={<SendIcon />}
        loading={loading}
        loadingPosition="end"
        variant="contained"
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit'}
      </LoadingButton>
      
      {success && (
        <Typography 
          sx={{ 
            mt: 2, 
            backgroundColor: '#e8f5e9', 
            padding: '8px 16px', 
            borderRadius: '4px',
            color: 'success.main'
          }}
        >
          Product created successfully!
        </Typography>
      )}
      
      {error && (
        <Typography 
          color="error" 
          sx={{ 
            mt: 2, 
            backgroundColor: '#ffebee', 
            padding: '8px 16px', 
            borderRadius: '4px',
            maxWidth: '100%',
            wordBreak: 'break-word'
          }}
        >
          {error}
        </Typography>
      )}
    </div>
  );
}

function Create_Form({ formData, setFormData }) {
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="filled-name"
        name="name"
        label="Name"
        variant="filled"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <TextField
        id="filled-price"
        name="price"
        label="Price (in Rs.)"
        variant="filled"
        value={formData.price}
        onChange={handleChange}
        required
      />
      <TextField
        id="filled-description"
        name="description"
        label="Description"
        variant="filled"
        value={formData.description}
        onChange={handleChange}
      />
      <TextField
        id="filled-image"
        name="image"
        label="Image (URL)"
        variant="filled"
        value={formData.image}
        onChange={handleChange}
        required
      />
      <TextField
        id="filled-shopping"
        name="shopping"
        label="Shopping Link"
        variant="filled"
        value={formData.shopping}
        onChange={handleChange}
      />
    </Box>
  );
}

function Update_Form({ formData, setFormData }) {
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="filled-id"
        name="id"
        label="Product ID"
        variant="filled"
        value={formData.id}
        onChange={handleChange}
        required
      />
      <TextField
        id="filled-name"
        name="name"
        label="Name"
        variant="filled"
        value={formData.name}
        onChange={handleChange}
      />
      <TextField
        id="filled-price"
        name="price"
        label="Price (in Rs.)"
        variant="filled"
        value={formData.price}
        onChange={handleChange}
      />
      <TextField
        id="filled-description"
        name="description"
        label="Description"
        variant="filled"
        value={formData.description}
        onChange={handleChange}
      />
      <TextField
        id="filled-image"
        name="image"
        label="Image (URL)"
        variant="filled"
        value={formData.image}
        onChange={handleChange}
      />
      <TextField
        id="filled-shopping"
        name="shopping"
        label="Shopping Link"
        variant="filled"
        value={formData.shopping}
        onChange={handleChange}
      />
    </Box>
  );
}

function UpdateButton({ formData, setFormData, clearForm }) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(false);
  const updateProduct = useProductStore(state => state.updateProduct);

  async function handleClick() {
    if (!formData.id) {
      setError("Product ID is required");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const result = await updateProduct(formData.id, {
        name: formData.name,
        price: formData.price,
        description: formData.description,
        image: formData.image
      });
      
      if (!result.success) {
        setError(result.error);
        console.error("Error:", result.error);
      } else {
        console.log("Success:", result.data);
        setSuccess(true);
        clearForm();
      }
    } catch (err) {
      setError(err.message);
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <LoadingButton
        size="large"
        onClick={handleClick}
        endIcon={<SendIcon />}
        loading={loading}
        loadingPosition="end"
        variant="contained"
        disabled={loading}
      >
        {loading ? 'Updating...' : 'Update'}
      </LoadingButton>
      
      {success && (
        <Typography 
          sx={{ 
            mt: 2, 
            backgroundColor: '#e8f5e9', 
            padding: '8px 16px', 
            borderRadius: '4px',
            color: 'success.main'
          }}
        >
          Product updated successfully!
        </Typography>
      )}
      
      {error && (
        <Typography 
          color="error" 
          sx={{ 
            mt: 2, 
            backgroundColor: '#ffebee', 
            padding: '8px 16px', 
            borderRadius: '4px',
            maxWidth: '100%',
            wordBreak: 'break-word'
          }}
        >
          {error}
        </Typography>
      )}
    </div>
  );
}

function Delete_Form({ formData, setFormData }) {
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="filled-id"
        name="id"
        label="Product ID"
        variant="filled"
        value={formData.id}
        onChange={handleChange}
        required
      />
    </Box>
  );
}

function DeleteButton({ formData, setFormData, clearForm }) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(false);
  const deleteProduct = useProductStore(state => state.deleteProduct);

  async function handleClick() {
    if (!formData.id) {
      setError("Product ID is required");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const result = await deleteProduct(formData.id);
      
      if (!result.success) {
        setError(result.error);
        console.error("Error:", result.error);
      } else {
        console.log("Success:", result.data);
        setSuccess(true);
        clearForm();
      }
    } catch (err) {
      setError(err.message);
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <LoadingButton
        size="large"
        onClick={handleClick}
        endIcon={<DeleteIcon />}
        loading={loading}
        loadingPosition="end"
        variant="contained"
        color="error"
        disabled={loading}
      >
        {loading ? 'Deleting...' : 'Delete'}
      </LoadingButton>
      
      {success && (
        <Typography 
          sx={{ 
            mt: 2, 
            backgroundColor: '#e8f5e9', 
            padding: '8px 16px', 
            borderRadius: '4px',
            color: 'success.main'
          }}
        >
          Product deleted successfully!
        </Typography>
      )}
      
      {error && (
        <Typography 
          color="error" 
          sx={{ 
            mt: 2, 
            backgroundColor: '#ffebee', 
            padding: '8px 16px', 
            borderRadius: '4px',
            maxWidth: '100%',
            wordBreak: 'break-word'
          }}
        >
          {error}
        </Typography>
      )}
    </div>
  );
}

function Dashboard() {
  const products = useProductStore(state => state.products);
  const fetchProducts = useProductStore(state => state.fetchProducts);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');

  React.useEffect(() => {
    let mounted = true;

    async function loadProducts() {
      try {
        const result = await fetchProducts();
        if (mounted) {
          if (!result.success) {
            setError(result.error);
          }
          setLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message);
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      mounted = false;
    };
  }, []);

  const handleCopyId = (id) => {
    navigator.clipboard.writeText(id)
      .then(() => {
        setOpenSnackbar(true);
        console.log('ID copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy ID:', err);
      });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
        Loading products...
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ textAlign: 'center', mt: 4 }}>
        Error: {error}
      </Typography>
    );
  }

  return (
    <Box 
      sx={{ 
        width: '100%',
        maxWidth: '1200px',
        mx: 'auto',
        px: { xs: 2, sm: 3 },
      }}
    >
      <TextField
        variant="outlined"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2, width: '50%' }}
        InputProps={{
          sx: {
            borderRadius: '20px',
          },
        }}
      />
      <Grid 
        container 
        spacing={0}
        sx={{ 
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 4,
          width: '100%',
          py: 4,
        }}
      >
        {filteredProducts.map((product) => (
          <Box 
            key={product._id}
            sx={{
              width: {
                xs: '100%',
                sm: 'calc(50% - 32px)',
                md: 'calc(33.333% - 32px)',
                lg: 'calc(25% - 32px)',
              },
              maxWidth: '240px',
              minWidth: '240px',
              display: 'flex',
            }}
          >
            <Card 
              sx={{ 
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                },
              }}
            >
              <Box 
                sx={{ 
                  width: '100%',
                  pt: '100%',
                  position: 'relative',
                  backgroundColor: '#f5f5f5',
                }}
              >
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.name}
                  sx={{ 
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    p: 2,
                  }}
                />
              </Box>
              <CardContent 
                sx={{ 
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  p: 2,
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              >
                <Typography 
                  variant="h6" 
                  component="h2"
                  sx={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    mb: 1,
                    lineHeight: 1.2,
                    height: '2.4em',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    width: '100%',
                  }}
                >
                  {product.name}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{
                    mb: 1,
                    height: '4.5em',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    width: '100%',
                    wordWrap: 'break-word',
                    fontSize: '1rem',
                  }}
                >
                  {product.description}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{
                    mt: 1,
                    color: 'text.secondary',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    '&:hover': {
                      color: 'primary.main',
                    },
                  }}
                  onClick={() => handleCopyId(product._id)}
                >
                  ID (Click to Copy)
                </Typography>
                <Typography 
                  variant="h6" 
                  color="primary"
                  sx={{
                    mt: 'auto',
                    pt: 1,
                    fontWeight: 600,
                    fontSize: '1.4rem',
                    borderTop: '1px solid #eee',
                    width: '100%',
                  }}
                >
                  ₹{formatPrice(product.price)}
                </Typography>
                {product.shopping && (
                  <Typography 
                    component="a" 
                    href={product.shopping}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      display: 'block',
                      mt: 1,
                      color: 'primary.main',
                      textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    Shop Now
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Box>
        ))}
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="success" 
          sx={{ width: '100%' }}
        >
          ID copied to clipboard!
        </Alert>
      </Snackbar>
    </Box>
  );
}

function formatPrice(price) {
  const num = price.toString();
  const lastThreeDigits = num.slice(-3);
  const otherDigits = num.slice(0, -3);
  const formattedPrice = otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + (otherDigits ? "," : "") + lastThreeDigits;
  return formattedPrice;
}

function DemoPageContent({ pathname }) {
  const [formData, setFormData] = React.useState({
    id: '',
    name: '',
    price: '',
    description: '',
    image: '',
    shopping: '',
  });

  function clearForm() {
    setFormData({
      id: '',
      name: '',
      price: '',
      description: '',
      image: '',
      shopping: '',
    });
  }

  let content;

  switch (pathname) {
    case '/':
      content = (
        <div>
          <Typography
            variant="h4"
            sx={{
              mb: 3,
              fontWeight: 'bold',
              color: 'primary.main',
              textAlign: 'center'
            }}
          >
            Product Dashboard
          </Typography>
          <Dashboard />
        </div>
      );
      break;
    case '/create':
      content = (
        <div>
          <Typography
            variant="h4"
            sx={{
              mb: 3,
              fontWeight: 'bold',
              color: 'primary.main',
            }}
          >
            Create a New Product
          </Typography>
          <Create_Form formData={formData} setFormData={setFormData} />
          <SubmitButton
            formData={formData}
            setFormData={setFormData}
            clearForm={clearForm}
          />
          <Typography variant="body1" 
            sx={{ marginTop:40, mb: 3, textAlign: 'center' }} >
            * Indicates that the field is required.
          </Typography> 
        </div>
      );
      break;
    case '/update':
      content = (
        <div>
          <Typography 
            variant="h4" 
            sx={{ 
              mb: 3,
              fontWeight: 'bold',
              color: 'primary.main'
            }}
          >
            Update Product
          </Typography>
          <Update_Form formData={formData} setFormData={setFormData} />
          <UpdateButton
            formData={formData}
            setFormData={setFormData}
            clearForm={clearForm}
          />
          <Typography variant="body1" 
            sx={{ marginTop:32, mb: 3, textAlign: 'center' }} >
            * Indicates that the field is required.
          </Typography>
        </div>
      );
      break;
    case '/delete':
      content = (
        <div>
          <Typography 
            variant="h4" 
            sx={{ 
              mb: 3,
              fontWeight: 'bold',
              color: 'primary.main'
            }}
          >
            Delete Product
          </Typography>
          <Delete_Form formData={formData} setFormData={setFormData} />
          <DeleteButton
            formData={formData}
            setFormData={setFormData}
            clearForm={clearForm}
          />
          <Typography variant="body1" 
            sx={{ marginTop:40, mb: 3, textAlign: 'center' }} >
            * Indicates that the field is required.
          </Typography>
        </div>
      );
      break;
    case '/about-me':
      content = (
        <div>
          <Typography 
            variant="h4" 
            sx={{ 
              mb: 3,
              fontWeight: 'bold',
              color: 'primary.main'
            }}
          >
            Behind the Code
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ mb: 3, textAlign: 'center' }}
          >
            Hey there!
I’m Nischaya Garg, currently pursuing a B.E. in Computer Science and Engineering (Honors) with a specialization in Artificial Intelligence and Machine Learning (IBM).
I developed this website as a storefront to showcase and simplify access to the plethora of products available out there. Leveraging the MERN stack (MongoDB, Express.js, React.js, and Node.js), I aimed to create a seamless and engaging user experience that reflects my passion for full-stack development.
I’m constantly learning and evolving, and this project is a testament to my journey as a developer. Feel free to explore, interact, and even share feedback—I’d love to hear your thoughts!
Stay curious and keep exploring!
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 3,
              fontWeight: 'bold',
              color: 'primary.main'
            }}
          >
            Disclaimer
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ mb: 3, textAlign: 'center' }}
          >
            This website is created solely for demonstration and portfolio purposes. All copyright and intellectual property rights related to the content, images, logos, and trademarks displayed are the property of their respective owners. The use of any such content is intended for educational and non-commercial purposes only.
          </Typography>
          <Typography 
            variant="h4" 
            sx={{ 
              mb: 3,
              fontWeight: 'bold',
              color: 'primary.main'
            }}
          >
            Connect with Me
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <a href="https://www.linkedin.com/in/nischaya008/" target="_blank" rel="noopener noreferrer">
              <AccountBoxIcon fontSize="large" />
            </a>
            <a href="https://github.com/Nischaya008" target="_blank" rel="noopener noreferrer">
              <GitHubIcon fontSize="large" />
            </a>
            <a href="https://x.com/Nischaya008" target="_blank" rel="noopener noreferrer">
              <TwitterIcon fontSize="large" />
            </a>
            <a href="mailto:nischayagarg008@gmail.com" target="_blank" rel="noopener noreferrer">
              <EmailIcon fontSize="large" />
            </a>
          </Box>
        </div>
      );
      break;
    default:
      content = (
        <Typography 
          variant="h4" 
          sx={{ 
            mb: 3,
            fontWeight: 'bold',
            color: 'primary.main'
          }}
        >
          Behind the Code
        </Typography>
      );
  }

  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      {content}
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function DashboardLayoutBranding(props) {
  const { window } = props;
  const router = useDemoRouter('/');
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: (
          <a href="/" style={{ textDecoration: 'none' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img 
                src="https://github.com/Nischaya008/Image_hosting/blob/main/SF_Logo.gif?raw=true" 
                alt="StoreFrontNG logo" 
                style={{ height: '40px', marginRight: '10px', borderRadius: '8px' }}
              />
              <Typography
                variant="h6"
                sx={{
                  color: 'primary.main',
                  fontWeight: 'bold',
                  display: { xs: 'none', sm: 'block' }
                }}
              >
              </Typography>
            </Box>
          </a>
        ),
        title: 'StoreFrontNG',
        homeUrl: '/',
      }}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

DashboardLayoutBranding.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutBranding;
