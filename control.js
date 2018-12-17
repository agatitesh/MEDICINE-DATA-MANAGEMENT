const db=require('../util/database');



module.exports.guest=(req,res,next)=>
{

}

module.exports.register=(req,res,next) => {


    const email=req.body.email;
    const password=req.body.password;
 

db.execute('insert into user (email,password) values  (?,?)',[email,password])
.then(  ([data,meta]) =>    {
   
    
    
    if(data)
   {    res.json({
        'Message':'You are sucessfully Register',
        'Email':email })
    }
})

.catch(err => {  if(err)
                    {    res.json({  'Message' :'This email is already registered with us .Kindly Login' })
                    }})

}


module.exports.login=(req,res,next) => {
                 
        const email=req.body.email;
        const password=req.body.password;

        db.execute('select email from user where email = (?) and password = (?)' ,[email,password])
        .then(( [ data,meta ]) => { console.log(data.length)
        
            console.log(meta);
            console.log("........................");
            
            console.log(data);

            if(data.length!=0)
            {
                res.setHeader('Set-cookie','logged=true' )
                res.json(
                    "You are sucessfully logged in "
                )
            }

else        {res.json("invalid email and password ")}
})
        .catch( err  => console.log(err) )



}


module.exports.addmedicine=(req,res,next) => {

    if(req.get('cookie'))
{
    
            const logged =req.get('cookie').split('=')[1].trim();

            if(logged =='admin')
        {  

       // const medid=req.body.medid;
        const name=req.body.name;
        const price=req.body.price;
        const dose =req.body.dose;
        const description=req.body.description;

    db.execute('insert into medicine (  name , price ,dose ,description) values ( ?  , ? , ?, ?) ',[name,price,dose,description])
        .then(([ data,metadata ]) => {              
           // console.log(data)
        
            if(data)
            {
                res.json({
                    'Message' :'your medicine is Sucessfully Added',
                   // 'medid':medid,
                    'name':name,
                    'price':price,
                    'dose':dose,
                    'description':description

                })
            }
         })
        .catch(err => { 
            //console.log(err)
            
            if (err)
            {
                res.json({
                    'Message ':'Medicine Already Exists'
                })
            }
        })
    }

    else{
        res.json({"Message" : " Unauthorised Access"})
    }
    }

    else{
        res.json({"Message":"You Are not logged in "})
    }
}

module.exports.updatemedicine=(req,res,next) => {
    if(req.get('cookie'))
    {
        const logged =req.get('cookie').split('=')[1].trim();

        if(logged == 'admin')
{

                const medid=req.body.medid;
                const name=req.body.name;
                const price=req.body.price;
                const description=req.body.description;
                const dose=req.body.dose;
            
                if(name && medid) 
                {
                    db.execute('update  medicine set name =(?) where medid= (?)',[name,medid])
                    .then(([data,metadata])=> {
                        if(data.affectedRows!=0)
                        {
                            res.json({"Message":"Your Medicine Sucessfully Updated",
                             "MedID":medid,           
                            "Medicine name":name
                        })
                        }


                      else{
                          res.json("Medicine Not Found")
                      }  
                    })
                    .catch(err => res.json("It Already Has same name")
                    )
                }
                if(price && medid)
                {
                    db.execute('update  medicine set price =(?) where medid= (?)',[price,medid])
                    .then(([data,metadata])=> {
                        if(data.affectedRows!=0)
                        {
                            res.json({"Message":"Your Medicine Sucessfully Updated",
                             "MedID":medid,           
                            "Medicine price":price
                        })
                        }


                      else{
                          res.json("Medicine Not Found")
                      }  
                    })
                    .catch(err => console.log(err)
                    )
                }
                if(description && medid)
                 {
                    db.execute('update  medicine set description =(?) where medid= (?)',[description,medid])
                    .then(([data,metadata])=> {
                        if(data.affectedRows!=0)
                        {
                            res.json({"Message":"Your Medicine Sucessfully Updated",
                             "MedID":medid,           
                            "Medicine description":description
                        })
                        }


                      else{
                          res.json("Medicine Not Found")
                      }  
                    })
                    .catch(err => console.log(err)
                    )
                }

                if(dose && medid)
                {
                    db.execute('upadte  medicine set dose =(?) where medid= (?)',[dose,medid])
                    .then(([data,metadata])=> {
                        if(data.affectedRows!=0)
                        {
                            res.json({"Message":"Your Medicine Sucessfully Updated",
                             "MedID":medid,           
                            "Medicine dose":dose
                        })
                        }


                      else{
                          res.json("Medicine Not Found")
                      }  
                    })
                    .catch(err => console.log(err)
                    )
                }
                
            }
            else{
                res.json({"Mesasge" : "Unuthorised Access"})
            }
        }           
                else{
                    res.json({"Mesasge" : "You are not logged In, Kindly Log In"})
                }


}

module.exports.deletemedicine=(req,res,next) => {

    if(req.get('cookie'))
    {
        const logged =req.get('cookie').split('=')[1].trim();

        if(logged == 'admin')
{
    const name= req.body.name;


    db.execute('delete from medicine where name = (? )',[name])
    .then(([data ,mdata ])=>  {//console.log(`you -${data.affectedRows}-------------------{******${mdata}*************}`);
                                        // console.log(data);
                                        
    
                 if(data.affectedRows !=0)
                        { res.json({
                          "Message" : "You have  sucessfully deleted  ",
                          "Medicine " : name
                        }
                        )}

                        else{
                            res.json(
                                { "Message" :"Medicine not Found "}
                             )
                        }
    })
    .catch(err =>{
        console.log(err);
    })
}
else{
    res.json({"Mesasge" : "Unuthorised Access"})
}
}
else{
    res.json({"Mesasge" : "You are not logged In, Kindly Log In"})
}  

}


module.exports.viewallmed=(req,res,next)=>{


    res.setHeader('Set-cookie','logged=guest')

    if(req.get('cookie'))
{

     const logged=req.get('cookie').split('=')[1].trim();
                   
    
    
    // console.log(logged == 'true');

    
    // console.log(typeof(logged))
    

    if(logged == 'true' || logged == 'admin' || logged == 'guest'){

                    db.execute('select * from medicine')
                    .then(([Medicine,metadata])=>{
                        //console.log(Medicine);
                                if(Medicine.length != 0)   { res.json({Medicine})} 

                                    else{
                                        res.json({"Message":"Empty"})
                                    }   })
                    .catch(err => console.log(err)
                    )
                
                
                }
}




}

module.exports.searchmed=(req,res,next) =>  {

    res.setHeader('Set-cookie','logged=guest')
   
    if(req.get('cookie'))
  {
      const logged=req.get('cookie').split('=')[1].trim();


        if(logged =='true' || logged == 'admin')
        {

             const name=req.body.name;

                                      db.execute('select * from medicine where name =(?)',[name])
                                      .then(([data,metadata])=>{ console.log(data);
                                      
                                          if(data.length !=0 )
                                          {
                                              res.json({data})
                                          }
                                          else{
                                              res.json({"Message":"Medicine Not Found"})
                                          }

                                      })
                                      .catch(err => console.log(err)
                                      )
         }                              
}

else
{   
    res.json({"Message " : "You are Not Logged In , Kindly Login"})
}

}

module.exports.getalluser=(req,res,next) =>{
        
                    if(req.get('cookie'))
                    {
                        const logged =req.get('cookie').split('=')[1].trim();

                        if(logged == 'admin')
                        db.execute('select * from user ')
                        .then(([data,metadata])=>{
                            res.json({data})
                        })
                        .catch(err => console.log(err)
                        )

                        else{
                            res.json({"Message" :"Unauthorised Access"})
                        }
                    }

                else{
                    res.json({"Mesasge" : "You are not logged In, Kindly Log In"})
                }

}

module.exports.getallorder=(req,res,next) => {

    if(req.get('cookie'))
                    {
                        const logged =req.get('cookie').split('=')[1].trim();

        if(logged == 'admin')
          {              

            db.execute('select * from order')
            .then(([data,metadata]) => {
                res.json({data})
            })
            .catch(err => console.log(err)
            )

        }
        else{
            res.json({"Message" :"Unauthorised Access"})
        }
        
}



else{
res.json({"Mesasge" : "You are not logged In, Kindly Log In"})
}



}

module.exports.logout=(req,res,next) => {
    if(req.get('cookie'))
    {res.setHeader('set-cookie','logged=false')
    res.json({"Message " : "Sucessfully Logged Out"})
}
    else{
        res.json({"Message " : "Kindly Login And Enjoy the Services"})
    }
}

module.exports.admin =(req,res,next) => {
    const email=req.body.email;
        const password=req.body.password;

        db.execute('select email from user where email = (?) and password = (?)' ,[email,password])
        .then(( [ data,meta ]) => { console.log(data.length)
        
            if(data.length!=0)
            {
                res.setHeader('Set-cookie','logged=admin' )
                res.json(
                    "You are sucessfully logged in "
                )
            }

else        {res.json("invalid email and password ")}
})
        .catch( err  => console.log(err) )



}

module.exports.searchuser=(req,res,next) =>{

       
        if(req.get('cookie'))
{
    const email=req.body.email;
    const data=req.get('cookie').split('=')[1].trim()
    
    if ( data = ' admin')
    {  
        db.execute('select * from user where email= (?)',[email])
        .then(([row,metadata])  => {
            if(data)
            {
                res.json({
                    data
                })
            }

            else{
                res.json({"Message":"User not Found"})
            }
        })

    }
    else{
        res.json("Unauhorised Ascess")
    }
}
else {
    res.json({
        "Message" :"Please Login"
    })
}

}

module.exports.orderdetails=(req,res,next)=>{

    if(req.get('cookie'))
    {
        const logged=req.get('cookie').split('=')[1].trim()
        if(logged == admin)
        {
            const id=req.body.orderid
        

            if(id)
            {
                db.execute('select * from order where orderid = (?),[id]')
                .then((data,meta)=>{
                    res.json({data}) })
                .catch((err)=>{console.log(err);
                })
            }


        }
        else{
            res.json({
                "Message ":"Unauthorised Access"
            })
        }
    }
    else{
        res.json({
            "Message":"Kindly Login"
        })
    }
     

}