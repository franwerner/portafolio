import emailjs from '@emailjs/browser';

interface TemplateParams {
    name: string
    email: string
    message: string
}


class EmailServive {

    static async send({
        template_id,
        values
    }: {
        values: TemplateParams,
        template_id: string
    }) {
        return emailjs
            .send('service_bftw3fm', template_id, values as any, {
                publicKey: "hEic0jpwthnG6aDqm",
                limitRate: {
                    throttle: 1000 * 10
                }
            })
    }

    static async sendToTemplateES(values: TemplateParams) {
        return this.send({
            values,
            template_id: "template_td5r5y6"
        })
    }

    static async sendToTemplateEN(values: TemplateParams) {
        return this.send({
            values,
            template_id: "template_td5r5y6"
        })
    }

}

export default EmailServive