// Richie T-57866

// The core code of this page was supplied by https://canvas.tlm.cloud/courses/74/pages/wiring-together-a-controller-with-mocha?module_item_id=50760

// Import controllers.
const ZipcodesPageController = require('../controllers/zipcodesPageController');
const ResourcesController = require('../controllers/resourcesController');
const UsersController = require('../controllers/usersController');
const authenticateToken = require('../helper/verifyJWT');

// Export crud methods.
module.exports = (app) => {
    // Zipcodes routes.
    app.use('/zipcodes', authenticateToken);
    app.get('/search/zipcodes/:zipId', ZipcodesPageController.read);
    app.get('/search/zipcodes/:zipId', ZipcodesPageController.read);
    app.get('/search/zipcodes/:zipId', ZipcodesPageController.read);

    // Resources routes.
    app.get('/resources/:id', authenticateToken, ResourcesController.displayOne);
    app.post('/resources', authenticateToken, ResourcesController.create);
    app.post('/resources/getByZipcode', authenticateToken, ResourcesController.getByZipcode);
    app.post('/resources/getByCounty/:county', authenticateToken, ResourcesController.getByCounty);
    app.post('/resources/getByName/:resourceName', authenticateToken, ResourcesController.getByName);
    app.put('/resources/update/:id', authenticateToken, ResourcesController.update);
    app.delete('/resources/delete/:id', authenticateToken, ResourcesController.delete);
    
    //User routes.
    app.get('/user', authenticateToken, UsersController.getUser);
    app.get('/checkUserStatus/:id', UsersController.getUser);
    app.get('/users/:userid', authenticateToken, UsersController.getUserForUpdate);
    app.get('/users', authenticateToken, UsersController.getAllUsers);
    app.put('/users/update/:id', authenticateToken, UsersController.updateUser);
    app.delete('/users/delete/:id', authenticateToken, UsersController.delete);
    app.post('/signup', UsersController.createUser);
    app.post('/login', UsersController.loginUser);
}
