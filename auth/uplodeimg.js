



// Uploding file function / module
const uploadImgFunction = async (file,path) => {
  return  await file.mv(path,err => {
        if(err){
            console.log(err)
         }
    })
}

module.exports = uploadImgFunction;