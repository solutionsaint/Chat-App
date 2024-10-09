export class BaseController {
    constructor(private readonly baseService: any) {}

    findAll() {
        return this.baseService.findAll();
    }

    findOne(id: string) {
        return this.baseService.findOne(id);
    }

    create(dto: any) {
        return this.baseService.create(dto);
    }

    update(id: string, dto: any) {
        return this.baseService.update(id, dto);
    }

    delete(id: string) {
        return this.baseService.delete(id);
    }
}
