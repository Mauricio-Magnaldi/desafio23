import passport from "passport";
import { usersManagerMongoDB } from "./dao/managersMongoDB/usersManagerMongoDB.js";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GithubStrategy } from "passport-github2";
import { hashData, compareData } from "./utils.js";

passport.use(
    "signup", 
    new LocalStrategy(
        {
            usernameField: "email",
            passReqToCallback: true,
        }, 
        async (req, email, password, done) => {
            try {
                const userDB = await usersManagerMongoDB.findByEmail(email);
                if (userDB) {
                    return done(null, false);
                }
                const hashedPassword = await hashData(password);
                const createdUser = await usersManagerMongoDB.createOne({
                    ...req.body, 
                    password : hashedPassword,
                });
                done(null, createdUser);
             } catch (error) { 
                done(error);
             }
        }
    )
);

passport.use(
    "login", 
    new LocalStrategy(
    {
        usernameField: "email",
    }, 
    async (email, password, done) => {
        try {
            const userDB = await usersManagerMongoDB.findByEmail(email);
            if(!userDB) {
                return done(null, false);
            }
            const comparePassword = await compareData(password, userDB.password);
            if (!comparePassword) {
                return done(null, false);
            } 
            done(null, userDB);
        } catch (error) {
            done(error);
        }
    }
    )
);


passport.use("github", new GithubStrategy({
    clientID: 'Iv1.289d1cec6541ea0a',
    clientSecret: 'd07c98e0780392726ae3a1a0da92b0e2a09ccad5',
    callbackURL: 'http://localhost:8080/api/sessions/github',
    }, 
    async function (accessToken, refreshToken, profile, done) {
        try {
            const userDB = await usersManagerMongoDB.findByEmail(profile._json.email);
            if ( userDB ) {
                if ( userDB.from_github ) {
                    return done(null, userDB);
                } else {
                    return done(null, false);
                }
            }
            /*
            El problema que tenía era que había configurado en GitHub como name: first_name-last_name entonces llegaba como null, al editarlo en GitHub como first_name last_name se pudo resolver.
            */
            const newUser = {
                first_name: profile._json.name.split(" ")[0],
                last_name: profile._json.name.split(" ")[1] || "",
                email: profile._json.email || profile.emails[0].value,
                password: " ",
                from_github: true,
            }
            const createdUser = await usersManagerMongoDB.createOne(newUser);
            done(null, createdUser);
        } catch (error) {
            done(error);
        }
}));


passport.serializeUser(function(user, done) {
    done(null, user._id);
  });
  
  passport.deserializeUser(async function(id, done) {
    try {
        const user = await usersManagerMongoDB.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
  });