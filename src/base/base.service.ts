export class BaseService {
    private readonly model: any;

    constructor(model: any) {
        this.model = model;
    }

    findAll() {
        return this.model.find().exec();
    }

    findOne(id: string) {
        return this.model.findById(id).exec();
    }

    create(createDto: any) {
        const createdItem = new this.model(createDto);
        return createdItem.save();
    }

    update(id: string, updateDto: any) {
        return this.model.findByIdAndUpdate(id, updateDto, { new: true }).exec();
    }

    delete(id: string) {
        return this.model.findByIdAndDelete(id).exec();
    }
}
