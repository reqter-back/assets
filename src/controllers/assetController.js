const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const broker = require('./serviceBroker');

exports.fileuploaded = [
    (req, res, next) =>{
        console.log(JSON.stringify(req.file));
        if (req.file === undefined || req.file == null)
        {
            //There is no avatar in the request
            res.status(400).json({"success" : false, "error" : "File not provided"});
            return;
        }
        var errors = validationResult(req);
        if (!errors.isEmpty())
        {  
            //There are errors. send error result
            res.status(400).json({"success" : false, "error" : errors});
            return;
        }
        else
        {
            // broker.sendRPCMessage({file : req.file}, 'uploadasset').then((result)=>{
            //     var obj = JSON.parse(result.toString('utf8'));
            //     if (!obj.success)
            //     {
            //         if (obj.error)
            //             return res.status(500).json(obj);
            //         else
            //         {
            //             res.status(404).json(obj);
            //         }
            //     }
            //     else
            //     {
            //         res.status(200).json(wrapUser(obj.data));
            //     }
            // });
            console.log(req.file);
            req.file.url = "/blobs/" + req.file.filename;
            res.status(200).json({'success' : true, "file" : req.file});
        }
    }
]

exports.batchfileuploaded = [
    (req, res, next) =>{
        console.log(JSON.stringify(req.file));
        if (req.files === undefined || req.files == null)
        {
            //There is no avatar in the request
            res.status(400).json({"success" : false, "error" : "Files not provided"});
            return;
        }
        var errors = validationResult(req);
        if (!errors.isEmpty())
        {  
            //There are errors. send error result
            res.status(400).json({"success" : false, "error" : errors});
            return;
        }
        else
        {
            broker.sendRPCMessage({file : req.file}, 'uploadasset').then((result)=>{
                var obj = JSON.parse(result.toString('utf8'));
                if (!obj.success)
                {
                    if (obj.error)
                        return res.status(500).json(obj);
                    else
                    {
                        res.status(404).json(obj);
                    }
                }
                else
                {
                    res.status(200).json(wrapUser(obj.data));
                }
            });
        }
    }
]
