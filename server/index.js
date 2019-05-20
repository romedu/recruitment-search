require("dotenv").config();

const express                  = require("express"),
      app                      = express(),
      cors                     = require("cors"),
      {PORT}                   = process.env,
      morgan                   = require("morgan"),
      candidatesRoutes         = require("./routes/candidate"),
      competencesRoutes        = require("./routes/competence"),
      employeesRoutes          = require("./routes/employee"),
      languagesRoutes          = require("./routes/language"),
      positionsRoutes          = require("./routes/position"),
      trainingsRoutes          = require("./routes/training"),
      authRoutes               = require("./routes/auth"),
      usersRoutes              = require("./routes/user"),
      workingExperiencesRoutes = require("./routes/working-experience"), 
      userMiddlewares          = require("./middlewares/user"),
      {createError}            = require("./helpers/error");


// General Middlewares
app.use(morgan("tiny"));
app.use(cors());
app.use(express.urlencoded({extended: true}));


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/positions", positionsRoutes);

// All of the following routes requires the user to be authenticated
app.use(userMiddlewares.checkIfToken)
app.use("/api/positions/:positionId/candidates", candidatesRoutes);

// In order to access or manipulate any of the followings, the user must be it's owner
app.use("/api/users/:userId/employees", userMiddlewares.checkIfCompany, userMiddlewares.checkIfOwner, employeesRoutes);
app.use("/api/users/:userId/languages", userMiddlewares.checkIfPerson, userMiddlewares.checkIfOwner, languagesRoutes);
app.use("/api/users/:userId/trainings", userMiddlewares.checkIfPerson, userMiddlewares.checkIfOwner, trainingsRoutes);
app.use("/api/users/:usedId/competences", userMiddlewares.checkIfPerson, userMiddlewares.checkIfOwner, competencesRoutes);
app.use("/api/users/:userId/working-experiences", userMiddlewares.checkIfPerson, userMiddlewares.checkIfOwner, workingExperiencesRoutes);
app.use("/api/users/:userId", userMiddlewares.checkIfOwner, usersRoutes);

// Error handler
app.use((error, req, res, next) => {
   if(!error.status){
      error = createError(500, "Internal Server Error");
   }  
   res.json({
      error: {
               status: error.status,
               message: error.message
            }
   });
})

// Initialize server
app.listen(PORT, () => {
   console.log(`App is running in: http://localhost:${PORT}`);
});