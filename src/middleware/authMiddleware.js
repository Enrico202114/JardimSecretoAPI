import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const autHeader = req.heders.authorization;

    if (!autHeader) {
        return res.status(401).json({
            message: 'Token não informado'
        });
    }

    const token = autHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(
            token,
            'minha-chave-secreta'
        );

        req.user = decoded;
        next();

    }catch (error) {
        
        return res.status(401).json({
            messsage: 'Token inválido ou expirado'
        });
    };
}

export default authMiddleware;