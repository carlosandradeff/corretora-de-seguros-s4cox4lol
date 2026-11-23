migrate(
  (app) => {
    const collection = new Collection({
      name: 'leads',
      type: 'base',
      listRule: null,
      viewRule: null,
      createRule: '',
      updateRule: null,
      deleteRule: null,
      fields: [
        { name: 'name', type: 'text', required: true, min: 3, max: 160 },
        { name: 'email', type: 'email', required: true },
        { name: 'phone', type: 'text', required: true, min: 10, max: 24 },
        {
          name: 'insurance_type',
          type: 'select',
          required: true,
          maxSelect: 1,
          values: ['auto', 'residencial', 'vida', 'saude', 'empresarial', 'viagem', 'outro'],
        },
        { name: 'message', type: 'text', required: false, max: 5000 },
        {
          name: 'status',
          type: 'select',
          required: true,
          maxSelect: 1,
          values: ['novo', 'contato_feito', 'convertido', 'descartado'],
        },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: [
        'CREATE INDEX idx_leads_insurance_type ON leads (insurance_type)',
        'CREATE INDEX idx_leads_status ON leads (status)',
        'CREATE INDEX idx_leads_created ON leads (created DESC)',
      ],
    })

    app.save(collection)
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('leads')
    app.delete(collection)
  },
)
